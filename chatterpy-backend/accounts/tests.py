import os
from faker import Factory

from django.conf import settings
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from .models import Account, Number

User = get_user_model()

from model_bakery import baker

faker = Factory.create()


class AccountsAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.number_testusers = 5
        self.account = Account.objects.create(company_name="Test")
        self.user_details = [
            {
                "email": faker.email(),
                "username": faker.user_name(),
                "password": faker.password(),
                "access": None,
                "refresh": None,
            }
            for i in range(self.number_testusers)
        ]

        self.user = [
            User.objects.create_vertified_user(
                email=self.user_details[i]["email"],
                username=self.user_details[i]["username"],
                password=self.user_details[i]["password"],
                account=self.account,
            )
            for i in range(self.number_testusers)
        ]
        self.client = APIClient()
        self.user[0].is_account_manager = True
        self.user[0].save()
        self.client.logout()

    def login_user(self, user_number):
        """
        Helper function to login a user
        """
        credentials = {
            "email": self.user_details[user_number]["email"],
            "password": self.user_details[user_number]["password"],
        }
        url = reverse("rest_login")
        response = self.client.post(url, data=credentials, format="json")
        self.assertIn("access_token", response.data)
        return response.json()["access_token"]

    def upload_media_cleanup(self):
        """
        Helper function to delete both media and folders created as a result of testing
        """
        if not settings.REMOTE_MEDIA_SERVER_IN_USE:
            users = User.objects.all()
            for user in users:
                if user.file:
                    upload_path = "profiles/{0}/".format(user.id)
                    upload_full_path = os.path.join(settings.MEDIA_ROOT, upload_path)
                    user.file.delete(save=True)
                    os.rmdir(upload_full_path)
                    user.delete()

    def test_authenticated_get_user_detail(self):
        """
        Ensure that an authenticated manager can see a user.
        """
        access = self.login_user(0)

        url = reverse("user-detail", args=[self.user[2].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], self.user[2].id)
        self.assertEqual(response.json()["email"], self.user[2].email)

    def test_authenticated_access_get_user_detail(self):
        """
        Ensure that an authenticated non manager user can see their own user information.
        """
        access = self.login_user(1)

        url = reverse("user-detail", args=[self.user[1].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], self.user[1].id)
        self.assertEqual(response.json()["email"], self.user[1].email)

    def test_authenticated_access_otheruser_get_user_detail(self):
        """
        Ensure that an authenticated non manager user can see the details of another user.
        """
        access = self.login_user(1)

        url = reverse("user-detail", args=[self.user[2].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], self.user[2].id)
        self.assertEqual(response.json()["email"], self.user[2].email)

    def test_authenticated_create_user(self):
        """
        Ensure that an authenticated manager can update a user.
        """
        access = self.login_user(0)
        with open(settings.STATIC_ROOT + "/test_image.png", "rb") as file:
            data = {
                "username": faker.user_name(),
                "email": "fake@example.com",
                # "email": faker.email(), Seems to create gmail addresses which may be valid. Don't want
                # to send an email in test
                "file": file,
                "password": faker.password(),
                "phone_number": faker.msisdn(),
            }
            url = reverse("user-list")
            self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
            response = self.client.post(url, data=data, format=None)
            self.assertEqual(response.status_code, 201)
            self.assertEqual(self.user[0].is_account_manager, True)
            self.assertEqual(response.json()["email"], data["email"])
        self.upload_media_cleanup()

    def test_authenticated_access_create_user(self):
        """
        Ensure that an authenticated non manager user can not create a user.
        """
        access = self.login_user(1)
        data = {
            "username": faker.user_name(),
            "email": "fake@example.com",
            "password": faker.password(),
            "phone_number": faker.msisdn(),
        }
        url = reverse("user-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, 403)

    def test_authenticated_update_user_detail(self):
        """
        Ensure that an authenticated manager can update a user.
        """
        access = self.login_user(0)
        data = {
            "username": faker.user_name(),
            "email": faker.email(),
            "phone_number": faker.msisdn(),
        }
        url = reverse("user-detail", args=[self.user[2].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user[0].is_account_manager, True)
        self.assertEqual(response.json()["id"], self.user[2].id)
        self.assertEqual(response.json()["email"], data["email"])

    def test_authenticated_access_update_user_detail(self):
        """
        Ensure that an authenticated non manager user can update their own information.
        """
        access = self.login_user(1)
        data = {
            "username": faker.user_name(),
            "email": faker.email(),
            "phone_number": faker.msisdn(),
        }
        url = reverse("user-detail", args=[self.user[1].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.json()["id"], self.user[1].id)
        self.assertEqual(response.json()["email"], data["email"])

    def test_authenticated_access_update_other_user_detail(self):
        """
        Ensure that an authenticated non manager user can not update another user.
        """
        access = self.login_user(2)
        data = {
            "username": faker.user_name(),
            "email": faker.email(),
            "phone_number": faker.msisdn(),
        }
        url = reverse("user-detail", args=[self.user[1].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(self.user[2].is_account_manager, False)

    def test_authenticated_delete_user_detail(self):
        """
        Ensure that an authenticated manager can delete another user.
        """
        access = self.login_user(0)

        url = reverse("user-detail", args=[self.user[2].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, 204)

    def test_authenticated_access_delete_user_detail(self):
        """
        Ensure that an authenticated non manager user cannot delete another user.
        """
        access = self.login_user(1)

        url = reverse("user-detail", args=[self.user[2].id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, 403)

    def test_unauthenticated_delete_user_detail(self):
        """
        Ensure that an unauthenticated user cannot delete another user.
        """

        url = reverse("user-detail", args=[self.user[2].id])
        response = self.client.delete(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_account_detail(self):
        """
        Ensure that an authenticated non manager user cannot delete another user.
        """
        access = self.login_user(0)

        url = reverse("account-detail", args=[self.account.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user[0].is_account_manager, True)

    def test_authenticated_access_account_detail(self):
        """
        Ensure that an authenticated non manager user cannot delete another user.
        """
        access = self.login_user(1)

        url = reverse("account-detail", args=[self.account.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.user[1].is_account_manager, False)

    def test_authenticated_update_account_detail(self):
        """
        Ensure that an authenticated manager user can update an account.
        """
        access = self.login_user(0)

        data = {"company_name": "New Name", "company_size": 32}
        self.assertFalse(self.account.company_name == data["company_name"])
        url = reverse("account-detail", args=[self.account.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["company_name"], data["company_name"])

    def test_authenticated_access_update_account_detail(self):
        """
        Ensure that an authenticated non manager user cannot update an account.
        """
        access = self.login_user(1)

        data = {"company_name": "New Name", "company_size": 32}
        self.assertFalse(self.account.company_name == data["company_name"])
        url = reverse("account-detail", args=[self.account.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 403)

    def test_unauthenticated_account_detail(self):
        """
        Ensure that an unauthenticated user cannot delete an account.
        """

        url = reverse("account-detail", args=[self.account.id])
        response = self.client.delete(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_delete_account_detail(self):
        """
        Ensure that an authenticated manager user can delete an account.
        """
        access = self.login_user(0)
        url = reverse("account-detail", args=[self.account.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(self.user[0].is_account_manager, True)

    def test_authenticated_access_delete_account_detail(self):
        """
        Ensure that an authenticated non manager user cannot delete an account.
        """
        access = self.login_user(1)

        url = reverse("account-detail", args=[self.account.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(self.user[1].is_account_manager, False)

    def test_authenticated_get_number_detail(self):
        """
        Ensure that an authenticated manager can see a number.
        """
        access = self.login_user(0)

        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-detail", args=[test_number.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["phone_number"], test_number.phone_number)

    def test_authenticated_access_get_number_detail(self):
        """
        Ensure that an authenticated non manager can see a number.
        """
        access = self.login_user(1)

        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-detail", args=[test_number.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["phone_number"], test_number.phone_number)

    def test_unauthenticated_access_get_number_detail(self):
        """
        Ensure that an unauthenticated user cannot see number.
        """
        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-detail", args=[test_number.id])
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_get_number_list(self):
        """
        Ensure that an authenticated manager can see a number.
        """
        access = self.login_user(0)

        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["results"]), 1)
        self.assertEqual(response.json()["results"][0]["phone_number"], test_number.phone_number)

    def test_authenticated_access_get_number_list(self):
        """
        Ensure that an authenticated non manager can see a number.
        """
        access = self.login_user(1)

        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["results"]), 1)
        self.assertEqual(response.json()["results"][0]["phone_number"], test_number.phone_number)

    def test_unauthenticated_get_number_list(self):
        """
        Ensure that an unauthenticated user cannot see number.
        """
        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-list")
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_create_number(self):
        """
        Ensure that an authenticated manager can create a number.
        """
        access = self.login_user(0)

        data = {"phone_number": faker.msisdn()}
        url = reverse("number-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["phone_number"], data["phone_number"])
        self.assertEqual(Number.objects.all().count(), 1)

    def test_authenticated_access_create_number(self):
        """
        Ensure that an authenticated non manager can not create a number.
        """
        access = self.login_user(1)

        data = {"phone_number": faker.msisdn()}
        url = reverse("number-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Number.objects.all().count(), 0)

    def test_unauthenticated_create_number(self):
        """
        Ensure that an unauthenticated user can not create a number.
        """
        data = {"phone_number": faker.msisdn()}
        url = reverse("number-list")
        response = self.client.post(url, data=data, format="json")
        self.assertIn(response.status_code, (401, 403))
        self.assertEqual(Number.objects.all().count(), 0)

    def test_authenticated_delete_number(self):
        """
        Ensure that an authenticated manager can delete a number.
        """
        access = self.login_user(0)

        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-detail", args=[test_number.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Number.objects.all().count(), 0)

    def test_authenticated_access_delete_number(self):
        """
        Ensure that an authenticated non manager can not delete a number.
        """
        access = self.login_user(1)

        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-detail", args=[test_number.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Number.objects.all().count(), 1)

    def test_unauthenticated_delete_number(self):
        """
        Ensure that an unauthenticated user can not delete a number.
        """
        test_number = Number.objects.create(phone_number=faker.msisdn(), account=self.account)
        url = reverse("number-detail", args=[test_number.id])
        response = self.client.delete(url, format="json")
        self.assertIn(response.status_code, (401, 403))
        self.assertEqual(Number.objects.all().count(), 1)
