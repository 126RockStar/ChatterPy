from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from rest_framework import serializers

from chatterpy.extras import get_account_or_validation_error
from .models import Email, Template, Datasource

User = get_user_model()


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ["id", "name", "data", "datasource", "account", "created"]
        read_only_fields = (
            "id",
            "account",
            "created",
        )

    def create(self, validated_data):
        account = get_account_or_validation_error(self.context["request"].user)
        return Template.objects.create(**validated_data, account=account)


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = [
            "id",
            "name",
            "number",
            "data",
            "datasource",
            "account",
            "created",
            "updated",
        ]
        read_only_fields = (
            "id",
            "account",
            "updated",
            "created",
        )

    def create(self, validated_data):
        account = get_account_or_validation_error(self.context["request"].user)
        return Template.objects.create(**validated_data, account=account)


class DatasourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datasource
        fields = ["id", "name", "fields", "created", "updated", "account"]
        read_only_fields = ("id", "updated", "created", "account")
