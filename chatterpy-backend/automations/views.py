from django.contrib.auth import get_user_model
from django.db.models import Prefetch

from rest_framework import generics, viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView

from .models import Automation
from .serializers import AutomationSerializer


class AutomationViewSet(viewsets.ModelViewSet):
    queryset = Automation.objects.all()
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = [IsAuthenticated]
    serializer_class = AutomationSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(account=self.request.user.account).prefetch_related("actions").order_by("-created")


# Generic Class Views In case Viewsets are insufficient:
# class AutomationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = AutomationSerializer
#     http_method_names = ["get", "put", "delete", "head"]

#     def get_queryset(self):
#         return Automation.objects.filter(account=self.request.user.account).prefetch_related("actions",)


# class AutomationListCreateAPIView(generics.ListCreateAPIView):
#     authentication_classes = [SessionAuthentication]
#     permission_classes = [IsAuthenticated]
#     serializer_class = AutomationSerializer

#     def get_queryset(self):
#         return Automation.objects.filter(account=self.request.user.account).prefetch_related("actions",)
