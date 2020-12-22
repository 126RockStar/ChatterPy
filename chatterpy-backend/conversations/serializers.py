from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.http import Http404

from rest_framework import serializers
from chatterpy.extras import get_account_or_validation_error
from .models import Conversation, Message, Assignment, Status, Upload

User = get_user_model()


class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = [
            "id",
            "file",
            "uploader",
            "account",
            "created",
        ]
        read_only_fields = ("id", "account", "uploader", "created")

    def create(self, validated_data):
        account = get_account_or_validation_error(self.context["request"].user)
        file = validated_data.pop("file")
        new_upload = Upload.objects.create(**validated_data, uploader=self.context["request"].user, account=account)
        new_upload.file.save(file.name, file)
        return new_upload


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = [
            "id",
            "assigned_by",
            "assigned_to",
            "active",
            "created",
        ]
        read_only_fields = ("id", "active", "assigned_by", "created")

    def create(self, validated_data):
        relevant_conversation = None
        try:
            relevant_conversation = Conversation.objects.visible_to_user(self.context["request"].user).get(
                id=self.context["convo_pk"]
            )
        except:
            raise Http404("No Matching Conversation Found")
        previous_assignment = (
            Assignment.objects.filter(conversation=relevant_conversation).order_by("-created").first()
        )
        if previous_assignment:
            previous_assignment.active = False
            previous_assignment.save()
        return Assignment.objects.create(
            **validated_data, assigned_by=self.context["request"].user, conversation=relevant_conversation, active=True
        )


class StatusSerializer(serializers.ModelSerializer):
    state = serializers.ChoiceField(choices=Status.Status_Types.choices)

    class Meta:
        model = Status
        fields = [
            "assigned_by",
            "state",
            "active",
            "created",
        ]
        read_only_fields = ("id", "active", "assigned_by", "created")

    def create(self, validated_data):
        relevant_conversation = None
        try:
            relevant_conversation = Conversation.objects.visible_to_user(self.context["request"].user).get(
                id=self.context["convo_pk"]
            )
        except:
            raise Http404("No Matching Conversation Found")
        previous_status = Status.objects.filter(conversation=relevant_conversation).order_by("-created").first()
        if previous_status:
            previous_status.active = False
            previous_status.save()
        return Status.objects.create(
            **validated_data, assigned_by=self.context["request"].user, conversation=relevant_conversation, active=True
        )

    def validate_state(self, state):
        if state is None:
            raise serializers.ValidationError("State cannot be None")
        if state not in Status.Status_Types.values:
            msg = "This field can only contain valid state strings: " + ",".join(Status.Status_Types.values)
            raise serializers.ValidationError(msg)
        return state


class MessageCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id",
            "message_id",
            "originator",
            "recipient",
            "message",
            "scheduled",
            "sent_from",
            "created",
            "media",
        ]
        read_only_fields = ("id", "created")

    def create(self, validated_data):
        relevant_conversation = None
        try:
            relevant_conversation = Conversation.objects.visible_to_user(self.context["request"].user).get(
                id=self.context["convo_pk"]
            )
        except:
            raise Http404("No Matching Conversation Found")
        return Message.objects.create(**validated_data, conversation=relevant_conversation,
                                      sent_from=self.context["request"].user)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id",
            "message_id",
            "sent_from",
            "originator",
            "recipient",
            "message",
            "media",
            "created",
        ]


class ConversationDetailSerializer(serializers.ModelSerializer):
    status = StatusSerializer(many=True)
    assignments = AssignmentSerializer(many=True)
    messages = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = [
            "id",
            "created",
            "contact",
            "updated",
            "status",
            "assignments",
            "messages",
        ]


class ConversationListSerializer(serializers.ModelSerializer):
    newest_message = serializers.CharField(read_only=True)
    newest_time = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Conversation
        fields = [
            "id",
            "conversation_id",
            "created",
            "contact",
            "updated",
            "account",
            "newest_message",
            "newest_time",
        ]
        read_only_fields = ("id", "account", "created")

    def create(self, validated_data):
        account = get_account_or_validation_error(self.context["request"].user)
        return Conversation.objects.create(**validated_data, account=account)
