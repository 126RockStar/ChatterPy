from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager

from accounts.models import Account

User = settings.AUTH_USER_MODEL


class Contact(models.Model):
    tags = TaggableManager(blank=True)
    first_name = models.CharField(max_length=26)
    last_name = models.CharField(max_length=26, null=True, blank=True)
    phone_number = models.CharField(null=True, blank=True, max_length=15, unique=False)
    email = models.EmailField(null=True, blank=True, verbose_name="email address", max_length=255, unique=False,)
    opted_out = models.BooleanField(default=False)
    collection = models.ManyToManyField(
        "Collection", blank=True, through="CollectionThrough", related_name="contacts",
    )
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="contacts")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.phone_number:
            return self.phone_number
        return self.first_name


class CollectionThrough(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name="contacts")
    collection = models.ForeignKey("Collection", on_delete=models.CASCADE, related_name="collection_through")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)


# List is a Python type and thus should NOT be used as a model name
class Collection(models.Model):
    name = models.CharField(max_length=32)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="collections")
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)


class DNM(models.Model):
    phone_number = models.CharField(max_length=15, unique=False)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="dnms")
    created = models.DateTimeField(auto_now_add=True)
