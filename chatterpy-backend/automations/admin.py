from django.contrib import admin
from .models import Automation, Action


@admin.register(Automation)
class AutomationAdmin(admin.ModelAdmin):
    model = Automation
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    model = Action
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )

    list_filter = ("created",)
