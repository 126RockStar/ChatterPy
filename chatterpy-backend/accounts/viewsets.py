from rest_framework import viewsets

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings
from accounts.models import User, Account, Number
from accounts.serializers import UserSerializer, AccountSerializer, NumberSerializer
from chatterpy.api_permissions import ManagerOrSafe, ManagerOrSelf


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated & ManagerOrSelf]
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer

    def filter_queryset(self, queryset):
        return (
            queryset.filter(account=self.request.user.account)
            .prefetch_related("account__users",)
            .order_by("-date_joined")
        )


class AccountViewSet(viewsets.ModelViewSet):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated & ManagerOrSafe]
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    # Make sure that only account visibile is user's account
    def filter_queryset(self, queryset):
        return queryset.filter(pk=self.request.user.account_id).order_by("-created")


class NumberViewSet(viewsets.ModelViewSet):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated & ManagerOrSafe]
    queryset = Number.objects.all()
    serializer_class = NumberSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account).order_by("-created")
