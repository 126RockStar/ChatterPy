from faker import Factory

from django.conf import settings
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from .models import Automation, Action, Template
from accounts.models import Account

User = get_user_model()

from model_bakery import baker

faker = Factory.create()


class AutomationsAPITestCase(APITestCase):
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

    def test_authenticated_get_automation_detail(self):
        """
        Ensure that an authenticated manager can get one Automation.
        """
        access = self.login_user(0)

        test_conversation = baker.make("automations.Automation", account=self.account, _fill_optional=True)
        url = reverse("automation-detail", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], test_conversation.id)

    def test_authenticated_access_get_automation_detail(self):
        """
        Ensure that an authenticated non manager can get one Automation.
        """
        access = self.login_user(2)

        test_conversation = baker.make("automations.Automation", account=self.account, _fill_optional=True)
        url = reverse("automation-detail", args=[test_conversation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], test_conversation.id)

    def test_unauthenticated_get_automation_detail(self):
        """
        Ensure that an unauthenticated user cannot get one Automation.
        """
        test_conversation = baker.make("automations.Automation", account=self.account, _fill_optional=True)
        url = reverse("automation-detail", args=[test_conversation.id])
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_get_automation_list(self):
        """
        Ensure that an authenticated manager can get all Automations.
        """
        access = self.login_user(0)

        test_conversation = baker.make(
            "automations.Automation", account=self.account, _fill_optional=True, _quantity=5
        )
        url = reverse("automation-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["results"]), 5)

    def test_authenticated_access_get_automation_list(self):
        """
        Ensure that an authenticated non manager can get all Automations.
        """
        access = self.login_user(0)

        test_conversation = baker.make(
            "automations.Automation", account=self.account, _fill_optional=True, _quantity=5
        )
        url = reverse("automation-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["results"]), 5)

    def test_unauthenticated_access_get_automation_list(self):
        """
        Ensure that an anonumous user cannot see Automations.
        """
        test_conversation = baker.make(
            "automations.Automation", account=self.account, _fill_optional=True, _quantity=5
        )
        url = reverse("automation-list")
        response = self.client.get(url, format="json")
        self.assertIn(response.status_code, (401, 403))

    def test_authenticated_create_automation(self):
        """
        Ensure that an authenticated manager can create an Automations.
        """
        access = self.login_user(0)
        test_number = baker.make("accounts.Number", account=self.account, _fill_optional=True)

        data = {
            "name": "Test Automation",
            "trigger": Automation.Trigger_Types.PARTIAL,
            "number": test_number.id,
            "active": True,
            "created_by": 1,
        }
        url = reverse("automation-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_authenticated_create_with_action_automation(self):
        """
        Ensure that an authenticated manager can create an Automation with an action.
        """
        access = self.login_user(0)
        test_number = baker.make("accounts.Number", account=self.account, _fill_optional=True)

        data = {
            "name": "Test Automation",
            "trigger": Automation.Trigger_Types.PARTIAL,
            "number": test_number.id,
            "active": True,
            "actions": [{"act": Action.Action_Types.CLOSE}],
        }
        url = reverse("automation-list")
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.post(url, data=data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_authenticated_update_with_action_automation(self):
        """
        Ensure that an authenticated manager can update both an existing Action on an existing Automation
        and the Automation itself.
        """
        access = self.login_user(0)
        test_automation = baker.make("automations.Automation", active=True, account=self.account)
        test_action = baker.make("automations.Action", act=Action.Action_Types.REMOVE, automation=test_automation)

        data = {
            "trigger": Automation.Trigger_Types.PARTIAL,
            "number": test_automation.number.id,
            "active": False,
            "actions": [{"id": test_action.id, "act": Action.Action_Types.ASSIGN}],
        }
        url = reverse("automation-detail", args=[test_automation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["actions"][0]["act"], Action.Action_Types.ASSIGN)
        self.assertEqual(response.json()["active"], False)

    def test_authenticated_update_with_action_add_another_automation(self):
        """
        Ensure that an authenticated manager can update an existing Action on an existing Automation, add
        a new action, remove an old action, and update the Automation itself. 
        """
        access = self.login_user(0)
        test_automation = baker.make("automations.Automation", active=True, account=self.account)
        test_action = baker.make(
            "automations.Action", act=Action.Action_Types.REMOVE, automation=test_automation, _quantity=2
        )

        data = {
            "trigger": Automation.Trigger_Types.PARTIAL,
            "number": test_automation.number.id,
            "active": False,
            "actions": [
                {"id": test_action[0].id, "act": Action.Action_Types.ASSIGN},
                {"act": Action.Action_Types.ADD},
            ],
        }
        url = reverse("automation-detail", args=[test_automation.id])
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {0}".format(access))
        response = self.client.patch(url, data=data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["actions"]), 2)
        self.assertEqual(response.json()["actions"][0]["act"], Action.Action_Types.ASSIGN)
        self.assertEqual(response.json()["actions"][1]["act"], Action.Action_Types.ADD)
        self.assertEqual(response.json()["active"], False)
