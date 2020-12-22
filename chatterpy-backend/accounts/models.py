import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django_better_admin_arrayfield.models.fields import ArrayField
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from allauth.account.models import EmailAddress


class Account(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    credits = models.IntegerField(_("Credits"), default=0)
    company_name = models.CharField(_("Company Name"), default="", max_length=50)
    company_size = models.SmallIntegerField(_("Company Size"), default=1)
    enterprise_price = models.FloatField(_("Enterprise price"), default=0.0)
    enterprise_credits = models.IntegerField(_("Enterprise credits"), default=0)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)


class Number(models.Model):
    phone_number = models.CharField(_("Phone number"), max_length=30, null=True, blank=True)
    account = models.ForeignKey(
        Account, verbose_name=_("Account"), on_delete=models.PROTECT, related_name="numbers", null=True, blank=True,
    )
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.phone_number)


ROLE_USER = "user"
ROLE_MANAGER = "manager"
ROLE_CHOICES = (
    (ROLE_USER, _("Account User")),
    (ROLE_MANAGER, _("Account Manager")),
)


class UserManager(BaseUserManager):
    def create_user(self, email, username, password, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        user = self.model(email=self.normalize_email(email), username=username, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        # Create Allauth Email object and send Email Confirmation
        allauth_email = EmailAddress.objects.create(user=user, email=email, primary=True, verified=False)
        allauth_email.send_confirmation()
        return user

    # Used for test cases
    def create_vertified_user(self, email, username, password, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        user = self.model(email=self.normalize_email(email), username=username, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        # Without a verified email dj_rest_auth endpoints will not allow users to login and get their JWT tokens
        EmailAddress.objects.create(user=user, email=email, primary=True, verified=True)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, password=password, username=username,)
        user.is_superuser = True
        user.is_staff = True
        user.set_password(password)
        user.save(using=self._db)
        # EmailAddress.objects.create(user=user, email=email, primary=True, verified=True)
        # allauth_email.send_confirmation()
        return user


class User(AbstractUser):
    def upload_to(instance, filename):
        return "profiles/{0}/{1}".format(instance.id, filename)

    account = models.ForeignKey(
        Account, verbose_name=_("Account"), on_delete=models.SET_NULL, null=True, blank=True, related_name="users",
    )
    phone_number = models.CharField(_("Phone number"), max_length=30, null=True, blank=True)
    file = models.ImageField(blank=True, null=True, upload_to=upload_to)
    first_name = models.CharField(blank=True, null=True, max_length=30, verbose_name="first name")
    last_name = models.CharField(blank=True, null=True, max_length=150, verbose_name="last name")
    role = models.CharField(_("Role"), choices=ROLE_CHOICES, max_length=7, default=ROLE_MANAGER)
    is_account_manager = models.BooleanField(default=False)
    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "auth_user"
        verbose_name = "User"


class Activation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    code = models.CharField(max_length=20, unique=True)
    email = models.EmailField(blank=True)


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
