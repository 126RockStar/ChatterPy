from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404

from rest_framework import serializers

from .models import Automation, Action

User = get_user_model()


class ActionSerializer(serializers.ModelSerializer):
    act = serializers.ChoiceField(choices=Action.Action_Types.choices)

    class Meta:
        model = Action
        fields = [
            "id",
            "order",
            "act",
            "automation",
            "collection",
            "user",
            "message",
            "updated",
            "created",
        ]
        read_only_fields = ("automation", "updated", "created")
        extra_kwargs = {
            "id": {"read_only": False, "required": False},
        }


class AutomationSerializer(serializers.ModelSerializer):
    trigger = serializers.ChoiceField(choices=Automation.Trigger_Types.choices)
    actions = ActionSerializer(many=True, required=False)

    class Meta:
        model = Automation
        fields = [
            "id",
            "name",
            "trigger",
            "creator",
            "account",
            "number",
            "active",
            "updated",
            "created",
            "actions",
        ]
        read_only_fields = ("id", "updated", "created", "creator", "account")

    def create(self, validated_data):
        account = None
        action_list = []
        new_actions = []
        try:
            account = self.context["request"].user.account
        except:
            raise serializers.ValidationError("User has no Account")
        if validated_data.get("actions"):
            action_list = validated_data.pop("actions")
        new_automation = Automation.objects.create(
            account=account, creator=self.context["request"].user, **validated_data
        )
        for action in action_list:
            new_actions.append(Action(**action, automation=new_automation))
        Action.objects.bulk_create(new_actions)
        return new_automation

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.trigger = validated_data.get("trigger", instance.trigger)
        instance.number = validated_data.get("number", instance.name)
        instance.active = validated_data.get("active", instance.name)

        # If Actions are provided, update any existing, create new, and delete removed ones
        action_list = validated_data.get("actions")
        created_actions = []
        updated_actions = []
        existing_actions = []
        if action_list or action_list == []:
            existing_actions = list(self.instance.actions.all())

            for action in action_list:
                actions_to_update = None
                for actions_to_update in existing_actions:
                    if actions_to_update.id == action.get("id"):
                        break
                    else:
                        actions_to_update = None
                if actions_to_update:
                    actions_to_update.act = action.get("act", actions_to_update.act)
                    actions_to_update.order = action.get("order", actions_to_update.order)
                    actions_to_update.collection = action.get("collection", actions_to_update.collection)
                    actions_to_update.user = action.get("user", actions_to_update.user)
                    actions_to_update.message = action.get("message", actions_to_update.message)
                    updated_actions.append(actions_to_update)
                    existing_actions.remove(actions_to_update)
                else:
                    new_action = Action(**action, automation=instance)
                    created_actions.append(new_action)
        Action.objects.bulk_update(updated_actions, ["act", "order", "collection", "user", "message"])
        Action.objects.bulk_create(created_actions)

        for to_delete in existing_actions:
            to_delete.delete()

        instance.save()
        return instance
