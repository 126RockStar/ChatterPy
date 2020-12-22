from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from accounts.models import User, Account, Number
from dj_rest_auth.registration.serializers import RegisterSerializer


class HyperlinkUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "phone_number", "role", "account"]


class HyperlinkAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ["url", "urls", "credits", "enterprise_price", "credits"]


class NumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Number
        fields = ["id", "phone_number", "account", "created"]
        read_only_fields = (
            "id",
            "account",
            "created",
        )

    def create(self, validated_data):
        account = None
        try:
            account = self.context["request"].user.account
        except:
            raise serializers.ValidationError("User has no Account")
        if self.context["request"].user.is_account_manager:
            # Only Managers of an Account can add numbers
            return Number.objects.create(**validated_data, account=account)
        raise PermissionDenied("Only managers can create numbers")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name",
                  "file", "phone_number", "is_account_manager", "account", "password"]
        read_only_fields = (
            "id",
            "created",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        if self.context["request"].user.is_account_manager:
            file = None
            if validated_data.get("file"):
                file = validated_data.pop("file")
            new_user = User.objects.create_user(**validated_data, account=self.context["request"].user.account)
            if file:
                new_user.file.save(file.name, file)
            return new_user
        raise PermissionDenied("Only managers can create users")

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.phone_number = validated_data.get("phone_number", instance.phone_number)

        if validated_data.get("file"):
            if instance.file:
                instance.file.delete(False)
            file = validated_data.pop("file")
            instance.file.save(file.name, file)

        # The only way to see Users via API is if they're already connected to an account
        # Only Managers of an Account can either remove a user from the account, or make them a Manager
        # Furthermore Managers can't make other managers non managers, they must resign
        if self.context["request"].user.is_account_manager:
            if validated_data.get("account") == None and not instance.is_account_manager:
                instance.account = None
            if validated_data.get("is_account_manager"):
                instance.is_account_manager = True
            if instance == self.context["request"].user and validated_data.get("is_account_manager") == False:
                # Make sure that there is more than one managers for the account, so that it isn't orphaned
                # without a single account manager
                account_managers = instance.account.users.all().filter(is_account_manager=True).count()
                if account_managers > 1:
                    instance.is_account_manager = False
        instance.save()
        return instance


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            "id",
            "credits",
            "enterprise_credits",
            "enterprise_price",
            "company_name",
            "company_size",
            "created",
        ]
        read_only_fields = (
            "id",
            "credits",
            "enterprise_credits",
            "enterprise_price",
            "created",
        )

    def create(self, validated_data):
        user_instance = self.context["request"].user
        if user_instance.account:
            raise serializers.ValidationError("User already has an Account")
        new_account = Account.objects.create(**validated_data)
        user_instance.account = new_account
        user_instance.is_account_manager = True
        user_instance.save()
        return new_account

    def update(self, instance, validated_data):
        instance.company_name = validated_data.get("company_name", instance.company_name)
        instance.company_size = validated_data.get("company_size", instance.company_size)
        instance.save()
        return instance


class ChatterPyUserRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def get_cleaned_data(self):
        super(ChatterPyUserRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }
