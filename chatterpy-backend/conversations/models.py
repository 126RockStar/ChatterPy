from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.db.models import Q

from accounts.models import Account
from contacts.models import Contact

User = settings.AUTH_USER_MODEL


class ConversationManager(models.Manager):
    def visible_to_user(self, user):
        if user.is_account_manager:
            return self.filter(account=user.account).distinct().order_by("-created")
        else:
            return (
                self.filter(account=user.account)
                .filter(
                    Q(assignments__assigned_to__id=user.id, assignments__active=True)
                    | Q(assignments__assigned_to__id=None, assignments__active=True)
                    | Q(assignments=None)
                    | Q(status__state="Open", status__active=True)
                )
                .distinct()
                .order_by("-created")
            )


class Conversation(models.Model):
    assigned = models.ManyToManyField(
        User,
        blank=True,
        through="Assignment",
        through_fields=("conversation", "assigned_to"),
        related_name="conversations",
    )
    conversation_id = models.CharField(max_length=15, unique=True)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name="conversations")
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="conversations")
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
    objects = ConversationManager()

    def __str__(self):
        return self.conversation_id


class Assignment(models.Model):
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="assignments",)
    assigned_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="given_assignments")
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="assignments")
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now=True)


class Status(models.Model):
    class Meta:
        verbose_name_plural = "statuses"

    class Status_Types(models.TextChoices):
        OPEN = "Open", _("Open")
        NEW = "New", _("New")
        PENDING = "Pending", _("Pending")
        CLOSE = "Closed", _("Closed")

    state = models.CharField(max_length=8, choices=Status_Types.choices, default=Status_Types.OPEN)
    assigned_by = models.ForeignKey(User, on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="status")
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.state


class Message(models.Model):
    originator = models.CharField(max_length=15)
    recipient = models.CharField(max_length=15)
    message = models.TextField()
    message_id = models.CharField(max_length=50)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    media = models.ForeignKey("Upload", null=True, blank=True, on_delete=models.CASCADE, related_name="messages")
    sent_from = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)
    scheduled = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message


class Upload(models.Model):
    def upload_to(instance, filename):
        return "uploads/{0}/{1}/{2}".format(instance.account, instance.id, filename)

    file = models.ImageField(blank=False, null=False, upload_to=upload_to)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="uploads")
    uploader = models.ForeignKey(User, null=False, on_delete=models.CASCADE, related_name="uploads")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
