from django.contrib import admin
from .models import Assignment, Conversation, Message, Status, Upload


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    model = Assignment
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    model = Status
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )

    list_filter = ("created",)


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    model = Conversation
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    model = Message
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)


@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    model = Upload
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)
