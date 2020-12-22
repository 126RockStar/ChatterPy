# from django.test import TestCase

# Create your tests here.
# from signalwire.rest import Client as signalwire_client

# project_id = "234827b9-0995-424a-a428-d7d50c576c96"
# api_token = "PT9cd23efd61812b38a150e1a9a60c9fb1d9abb6b8166fd499"

# client = signalwire_client(project_id, api_token, signalwire_space_url="pyther.signalwire.com")

# account = client.api.accounts(project_id).fetch()

# print(account.friendly_name)

# # message = client.messages.create(from_='+14242572269', body='Hello World!', to='+13234462700')
# #
# # print(message.sid)

# message = client.messages("e69a9c4f-c9f8-496a-8bd5-6fbe77574248").fetch()

# print(message.to)
import os
from faker import Factory

from django.conf import settings
from django.contrib.auth import get_user_model
from django.test import Client
from django.urls import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase
from allauth.account.models import EmailAddress
from .models import Conversation, Message, Assignment, Status, Upload
from accounts.models import Account

User = get_user_model()

from model_bakery import baker

faker = Factory.create()


class ConversationsAPITestCase(APITestCase):
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
            uploads = Upload.objects.all()
            for upload in uploads:
                upload_path = "uploads/{0}/{1}/".format(upload.account, upload.id)
                upload_full_path = os.path.join(settings.MEDIA_ROOT, upload_path)
                upload.file.delete(save=True)
                os.rmdir(upload_full_path)
                upload.delete()

            for upload in uploads:
                upload_path = "uploads/{0}".format(upload.account)
                upload_full_path = os.path.join(settings.MEDIA_ROOT, upload_path)
                try:
                    os.rmdir(upload_full_path)
                except:
                    print("UPLOAD CLEANUP::Already Deleted Empty Folder")

    def test_authenticated_get_conversations(self):
        """
        Ensure that an authenticated manager can get a list of conversations.
        """
        access = self.login_user(0)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        url = reverse("conversations:conversation_list_api")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["results"][0]["id"], test_conversation.id)

    def test_unauthenticated_get_conversations(self):
        """
        Ensure that an unauthenticated user cannot get a list of conversations.
        """
        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        url = reverse("conversations:conversation_list_api")
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_manager_conversation_detail(self):
        """
        Ensure that a manager can see an assigned conversation
        """
        access = self.login_user(0)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[3], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )

        url = reverse("conversations:conversation_detail_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(self.user[0].is_account_manager, True)
        self.assertEqual(response.status_code, 200)

    def test_allowed_conversation_detail(self):
        """
        Ensure that a non manager user can see a conversation that they were assigned to
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[1], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )

        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        url = reverse("conversations:conversation_detail_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 200)

    def test_allowed_unassigned_conversation_detail(self):
        """
        Ensure that a non manager user can see a conversation that is unassigned
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )

        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        url = reverse("conversations:conversation_detail_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 200)

    def test_allowed_open_conversation_detail(self):
        """
        Ensure that a non manager user can see a conversation that is unassigned
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Open", active=True
        )

        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        url = reverse("conversations:conversation_detail_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 200)

    def test_unallowed_conversation_detail(self):
        """
        Ensure that a non manager user cannot see a conversation that is not assigned to them
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[0], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )

        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        url = reverse("conversations:conversation_detail_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 404)

    def test_unauthenticated_conversation_detail(self):
        """
        Ensure that an anonumous user cannot see a conversation.
        """
        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        url = reverse("conversations:conversation_detail_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_make_assignment(self):
        """
        Ensure that a manger can make an assignment.
        """
        access = self.login_user(0)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        data = {"assigned_to": self.user[1].id}
        url = reverse("conversations:assign_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_unallowed_authenticated_make_assignment(self):
        """
        Ensure a non manger user can't assign a conversation which isn't visible to them.
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[0], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )
        data = {"assigned_to": self.user[2].id}
        url = reverse("conversations:assign_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 404)

    def test_unauthenticated_make_assignment(self):
        """
        Ensure unauthenticated user cannot make an assignment
        """
        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        url = reverse("conversations:assign_api", args=[test_conversation.id])
        self.client.logout()
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_change_status(self):
        """
        Ensure that a manger can change the status.
        """
        access = self.login_user(0)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        data = {"state": "Close"}
        url = reverse("conversations:status_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[0].is_account_manager, True)
        self.assertEqual(response.status_code, 201)

    def test_unallowed_authenticated_change_status(self):
        """
        Ensure a non manger user can't change the status of a conversation which isn't visible to them.
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[0], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )
        data = {"state": "Close"}
        url = reverse("conversations:status_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 404)

    def test_allowed_authenticated_change_status(self):
        """
        Ensure a non manger user can't change the status of a conversation which isn't visible to them.
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[1], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )
        data = {"state": "Close"}
        url = reverse("conversations:status_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 201)

    def test_unauthenticated_change_status(self):
        """
        Ensure unauthenticated user cannot change the status of a conversation
        """
        self.client.logout()
        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        data = {"state": "Close"}
        url = reverse("conversations:status_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_post_message(self):
        """
        Ensure that a manger can post a new message to a conversation.
        """
        access = self.login_user(0)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        data = {
            "message_id": faker.bothify(text="??????????"),
            "originator": faker.msisdn(),
            "recipient": faker.msisdn(),
            "message": faker.sentence(),
        }
        url = reverse("conversations:message_create_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[0].is_account_manager, True)
        self.assertEqual(response.status_code, 201)

    def test_unallowed_authenticated_post_message(self):
        """
        Ensure a non manger user can't post a new message to a conversation which isn't visible to them.
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[0], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )
        data = {
            "message_id": faker.bothify(text="??????????"),
            "originator": faker.msisdn(),
            "recipient": faker.msisdn(),
            "message": faker.sentence(),
        }
        url = reverse("conversations:message_create_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 404)

    def test_allowed_authenticated_post_message(self):
        """
        Ensure a non manger user can post a new message to a conversation which is visible to them.
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_assignment = Assignment.objects.create(
            conversation=test_conversation, assigned_to=self.user[1], assigned_by=self.user[0], active=True
        )
        test_status = Status.objects.create(
            conversation=test_conversation, assigned_by=self.user[0], state="Pending", active=True
        )
        data = {
            "message_id": faker.bothify(text="??????????"),
            "originator": faker.msisdn(),
            "recipient": faker.msisdn(),
            "message": faker.sentence(),
        }
        url = reverse("conversations:message_create_api", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertEqual(response.status_code, 201)

    def test_unauthenticated_post_message(self):
        """
        Ensure an unauthenticated user cannot post a message to a conversation
        """
        self.client.logout()
        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        data = {
            "message_id": faker.bothify(text="??????????"),
            "originator": faker.msisdn(),
            "recipient": faker.msisdn(),
            "message": faker.sentence(),
        }
        url = reverse("conversations:message_create_api", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_delete_message(self):
        """
        Ensure that a manger can delete an existing message.
        """
        access = self.login_user(0)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_message = baker.make("conversations.Message", conversation=test_conversation, _fill_optional=True)
        url = reverse("conversations:message_delete_api", args=[test_conversation.id, test_message.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(self.user[0].is_account_manager, True)
        self.assertEqual(response.status_code, 204)

    def test_authenticated_unallowed_delete_message(self):
        """
        Ensure that a non manger cannot delete an existing message.
        """
        access = self.login_user(1)

        test_conversation = baker.make("conversations.Conversation", account=self.account, _fill_optional=True)
        test_message = baker.make("conversations.Message", conversation=test_conversation, _fill_optional=True)
        url = reverse("conversations:message_delete_api", args=[test_conversation.id, test_message.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.delete(url, format="json")
        self.assertEqual(self.user[1].is_account_manager, False)
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_upload_media(self):
        """
        Ensure that a manger can upload media.
        """
        access = self.login_user(0)

        url = reverse("conversations:upload_api")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        with open(settings.STATIC_ROOT + "/test_image.png", "rb") as file:
            response = self.client.post(url, {"file": file}, format=None)
            self.assertEqual(response.status_code, 201)
            self.assertEqual(Upload.objects.all().count(), 1)
        # To see files in settings.STATIC_ROOT folder uncomment command below:
        self.upload_media_cleanup()

    def test_authenticated_access_upload_media(self):
        """
        Ensure that a non manager user can upload media.
        """
        access = self.login_user(1)

        url = reverse("conversations:upload_api")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        with open(settings.STATIC_ROOT + "/test_image.png", "rb") as file:
            response = self.client.post(url, {"file": file}, format=None)
            self.assertEqual(response.status_code, 201)
            self.assertEqual(Upload.objects.all().count(), 1)
        # To see files in settings.STATIC_ROOT folder uncomment command below:
        self.upload_media_cleanup()

    def test_unauthenticated_upload_media(self):
        """
        Ensure an unauthenticated user cannot upload media
        """

        url = reverse("conversations:upload_api")
        with open(settings.STATIC_ROOT + "/test_image.png", "rb") as file:
            response = self.client.post(url, {"file": file}, format=None)
            self.assertIn(response.status_code, (401, 403))
            self.assertEqual(Upload.objects.all().count(), 0)

    def test_authenticated_get_media(self):
        """
        Ensure that a manger can upload media.
        """
        access = self.login_user(0)

        media_id = None
        url = reverse("conversations:upload_api")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        with open(settings.STATIC_ROOT + "/test_image.png", "rb") as file:
            response = self.client.post(url, {"file": file}, format=None)
            media_id = response.json()["id"]
            self.assertEqual(response.status_code, 201)
            self.assertEqual(Upload.objects.all().count(), 1)

        url = reverse("conversations:upload_detail_api", args=[media_id])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("file", response.json())
        # To see files in settings.STATIC_ROOT folder uncomment command below:
        self.upload_media_cleanup()
