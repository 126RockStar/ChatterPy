from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from accounts.models import Account, User, Number
from .models import Template, Datasource
from conversations.models import Conversation, Message
from contacts.models import Contact
from chatterpy.AccountManager import AccountManager, verify_number_format
import json
import uuid

from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from .models import Email, Template, Datasource
from .serializers import EmailSerializer, TemplateSerializer, DatasourceSerializer

import pusher

pusher_client = pusher.Pusher(
  app_id='1040210',
  key='2a2cb8f6723748faf515',
  secret='fc453bedaa728047e3b7',
  cluster='us3',
  ssl=True
)

class EmailViewSet(viewsets.ModelViewSet):
    queryset = Email.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = EmailSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account)


class DataSourceViewSet(viewsets.ModelViewSet):
    queryset = Datasource.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = DatasourceSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account)


class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = TemplateSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account)


@csrf_exempt
def incoming_emails(request):
    if request.method == "POST":
        raw_email = request.body
        data = json.loads(raw_email)
        account_id = data["Account-ID"]
        account_id = uuid.UUID(account_id)
        if data["Phone"] == "":
            return HttpResponse(status=301)

        account_exits = Account.objects.filter(id=account_id).exists()

        if account_exits:

            account = Account.objects.filter(id=account_id).first()
            manager = AccountManager(account.id)
            d = Datasource.objects.filter(account=account).filter(name=data["Email-ID"]).first()

            t = Template.objects.filter(account=account).filter(datasource=d).first()
            originator = verify_number_format(t.number.phone_number)
            recipient = verify_number_format(str(data["Phone"]))
            conversation_id = str(int(originator) + int(recipient))
            conversation_exists = Conversation.objects.filter(conversation_id=conversation_id).exists()
            if conversation_exists:
                conversation = Conversation.objects.get(conversation_id=conversation_id)
                msg = manager.create_message(conversation, t.number.phone_number, data["Phone"], t.data, "dummy")
                user = User.objects.get(pk=int(data["User"]))
                msg.sent_from = user
                msg.save()

            else:
                contact = manager.create_contact(data["firstname"], data["lastname"], str(data["Phone"]))
                conversation = manager.create_conversation(conversation_id, contact)
                msg = manager.create_message(conversation, t.number.phone_number, data["Phone"], t.data, "dummy")
                user = User.objects.get(pk=int(data["User"]))
                msg.sent_from = user
                msg.save()

    return HttpResponse(status=201)


@csrf_exempt
def incoming_message(request):
    if request.method == "POST":
        raw_data = request.body
        print(raw_data)
        data = json.loads(raw_data)

        recipient = data["recipient"]
        originator = data["sender"]
        conversation_id = str(int(recipient) + int(originator))
        account = Number.objects.get(phone_number=recipient).account
        manager = AccountManager(account.id)

        contact_exists = manager.contact_exists(originator)
        if contact_exists:
            contact = manager.get_contact(originator)
            conversation = manager.create_conversation(conversation_id, contact)
            msg = manager.create_message(conversation, originator, recipient, data["message"], data["id"])
            pusher_client.trigger(account.id, 'incoming-message', {'message': "incoming message detected"})
        else:
            print("contact does not exist")
            contact = manager.create_contact(originator, "", originator)
            conversation = manager.create_conversation(conversation_id, contact)
            msg = manager.create_message(conversation, originator, recipient, data["message"], data["id"])
            pusher_client.trigger(account.id, 'conversation', {'message': "new conversation detected"})
        print(account)

    return HttpResponse(status=200)


@csrf_exempt
def message_status(request):
    print(request.body)
