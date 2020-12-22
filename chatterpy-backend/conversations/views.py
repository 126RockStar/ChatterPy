from django.views.generic import TemplateView
from django.contrib.auth import get_user_model
from django.db.models import Prefetch, OuterRef, Subquery
from django.db.models import Q

from rest_framework import generics, filters, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from chatterpy.AccountManager import AccountManager

from chatterpy.api_permissions import (
    ManagerRequiredDeletion,
    IsAssignedUser,
    IsOpenOrIsAssigned,
)
from .models import Conversation, Message, Assignment, Status, Upload
from .serializers import (
    ConversationListSerializer,
    ConversationDetailSerializer,
    UploadSerializer,
    AssignmentSerializer,
    StatusSerializer,
    MessageCreationSerializer,
    MessageSerializer,
)

import logging
import pusher

pusher_client = pusher.Pusher(
  app_id='1040210',
  key='2a2cb8f6723748faf515',
  secret='fc453bedaa728047e3b7',
  cluster='us3',
  ssl=True
)


logging.basicConfig(filename="chat.log", level=logging.DEBUG)


class IndexPageView(TemplateView):
    template_name = "chatterpy/index.html"


class ConversationContextMixin(object):
    def get_serializer_context(self):
        context = super(ConversationContextMixin, self).get_serializer_context()
        context.update({"convo_pk": self.kwargs["convo_pk"]})
        return context


class AssignmentCreateAPIView(ConversationContextMixin, generics.CreateAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = AssignmentSerializer


class StatusCreateAPIView(ConversationContextMixin, generics.CreateAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = StatusSerializer


class MessageCreateAPIView(ConversationContextMixin, generics.CreateAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = MessageCreationSerializer

    def create(self, request, *args, **kwargs):
        account_manager = AccountManager(self.request.user.account)
        #account_manager.send_message(request.data["originator"], request.data["recipient"], request.data["message"])
        print("Message sent")
        account_id_str = str(self.request.user.account.id)
        pusher_client.trigger(account_id_str, 'outgoing-message',
                              {'message': "out going message detected"})
        return super(MessageCreateAPIView, self).create(request, *args, **kwargs)


class MessageDeleteAPIView(generics.DestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated & ManagerRequiredDeletion]
    serializer_class = MessageSerializer

    def get_queryset(self):
        return Message.objects.filter(conversation__account=self.request.user.account)


class ConversationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated & ManagerRequiredDeletion]
    serializer_class = ConversationDetailSerializer
    http_method_names = ["get", "put", "delete", "head"]

    # Unauthorized users do not know they found a conversation which they're not allowed to see,
    # They only get a 404.
    def get_queryset(self):
        return Conversation.objects.visible_to_user(self.request.user).prefetch_related(
            "assignments", "messages", "status",
        )


class ConversationListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationListSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ["contact", "assigned", "messages__message"]

    def get_queryset(self):
        latest_message = Message.objects.filter(conversation=OuterRef("pk")).order_by("-created")
        return Conversation.objects.visible_to_user(self.request.user).annotate(
            newest_message=Subquery(latest_message.values("message")[:1]),
            newest_time=Subquery(latest_message.values("created")[:1]),
        )


class UploadListCreateAPIView(generics.ListCreateAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = UploadSerializer

    def get_queryset(self):
        return Upload.objects.filter(account=self.request.user.account)


class UploadDetailAPIView(generics.RetrieveDestroyAPIView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = UploadSerializer

    def get_queryset(self):
        return Upload.objects.filter(account=self.request.user.account)
