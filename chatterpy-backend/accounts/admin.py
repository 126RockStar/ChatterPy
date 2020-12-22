from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from django.contrib import admin
from .models import Account, User, Number
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin, DynamicArrayMixin):
    list_display = [
        "id",
        "company_name",
        "company_size",
        "credits",
        "enterprise_price",
        "enterprise_credits",
    ]


@admin.register(Number)
class AccountAdmin(admin.ModelAdmin, DynamicArrayMixin):
    list_display = ["id", "phone_number", "account", "created"]


@admin.register(User)
class ProfileAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            _("Personal info"),
            {"fields": ("account", "first_name", "last_name", "phone_number", "email", "role", "file",)},
        ),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "is_account_manager")},),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = [
        "id",
        "username",
        "email",
        "date_joined",
        "role",
        "is_active",
        "is_staff",
        "is_superuser",
    ]


# Unless you want to use django's built in groups this should be unregistered
admin.site.unregister(Group)
