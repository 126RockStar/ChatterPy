from django.db import models
from accounts.models import Number
from django.contrib.postgres.fields import JSONField
from django_better_admin_arrayfield.models.fields import ArrayField

from accounts.models import Account


class Template(models.Model):
    data = models.TextField()
    name = models.CharField(max_length=32)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="templates")
    number = models.ForeignKey(Number, on_delete=models.CASCADE, related_name="templates")
    datasource = models.ForeignKey("Datasource", null=True, on_delete=models.CASCADE, related_name="templates")
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Email(models.Model):
    data = JSONField()
    name = models.CharField(max_length=32)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="emails")
    datasource = models.ForeignKey("Datasource", on_delete=models.CASCADE, related_name="emails")
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Datasource(models.Model):
    fields = ArrayField(models.CharField(max_length=200), blank=True)
    name = models.CharField(max_length=32)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="datasources")
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
