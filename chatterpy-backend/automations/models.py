from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from conversations.models import Conversation, Upload

from accounts.models import Account, Number
from contacts.models import Collection

User = settings.AUTH_USER_MODEL


class Automation(models.Model):
    class Trigger_Types(models.TextChoices):
        FIRST = "First Incoming Message", _("First Incoming Message")
        EXACT = "Exact Match", _("Exact Match")
        PARTIAL = "Contains Keyword", _("Contains Keyword")
        TIME = "Time of Incoming Message", _("Time of Incoming Message")

    name = models.CharField(max_length=24)
    trigger = models.CharField(max_length=24, choices=Trigger_Types.choices, default=Trigger_Types.FIRST)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="automations")
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="automations")
    number = models.ForeignKey(Number, on_delete=models.CASCADE, related_name="automations")
    active = models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.name:
            return self.name
        else:
            return self.trigger + _(" Automation")


class Action(models.Model):
    class Action_Types(models.TextChoices):
        SEND = "Send a Message", _("Send a Message")
        ADD = "Add to List", _("Add to List")
        REMOVE = "Remove from List", _("Remove from List")
        ASSIGN = "Assign To", _("Assign To")
        CLOSE = "Close Chat", _("Close Chat")

    order = models.SmallIntegerField(default=1)
    act = models.CharField(max_length=16, choices=Action_Types.choices)
    automation = models.ForeignKey(Automation, null=False, on_delete=models.CASCADE, related_name="actions")
    collection = models.ForeignKey(Collection, null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    message = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
