from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from rest_framework import generics, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from .models import Contact, Collection, DNM
from .serializers import ContactSerializer, CollectionSerializer, DNMSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = ContactSerializer

    def filter_queryset(self, queryset):
        return (
            queryset.filter(account=self.request.user.account).prefetch_related("collection",).order_by("first_name")
        )


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = CollectionSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account).prefetch_related("contacts",).order_by("name")


class DNMViewSet(viewsets.ModelViewSet):
    queryset = DNM.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = DNMSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account).order_by("phone_number")


# Generic Class Views In case Viewsets are insufficient:

# class ContactDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = ContactSerializer
#     http_method_names = ["get", "put", "delete", "head"]

#     def get_queryset(self):
#         return Contact.objects.filter(account=self.request.user.account).prefetch_related("collection",)


# class ContactListCreateAPIView(generics.ListCreateAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = ContactSerializer

#     def get_queryset(self):
#         return Contact.objects.filter(account=self.request.user.account).prefetch_related("collection",)


# class CollectionsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = CollectionSerializer
#     http_method_names = ["get", "put", "delete", "head"]

#     def get_queryset(self):
#         return Collection.objects.filter(account=self.request.user.account).prefetch_related("contacts",)


# class CollectionsListCreateAPIView(generics.ListCreateAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = CollectionSerializer

#     def get_queryset(self):
#         return Collection.objects.filter(account=self.request.user.account).prefetch_related("contacts",)


# class DNMDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = DNMSerializer
#     http_method_names = ["get", "put", "delete", "head"]

#     def get_queryset(self):
#         return DNM.objects.filter(account=self.request.user.account)


# class DNMListCreateAPIView(generics.ListCreateAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = DNMSerializer

#     def get_queryset(self):
#         return DNM.objects.filter(account=self.request.user.account)
