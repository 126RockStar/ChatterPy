from django.urls import path

from .views import (
    IndexPageView,
    ConversationListCreateAPIView,
    ConversationDetailAPIView,
    AssignmentCreateAPIView,
    StatusCreateAPIView,
    MessageCreateAPIView,
    MessageDeleteAPIView,
    UploadListCreateAPIView,
    UploadDetailAPIView,
)

urlpatterns = [
    path("conversation/", IndexPageView.as_view(), name="home"),
    path("v1/conversation/", ConversationListCreateAPIView.as_view(), name="conversation_list_api"),
    path("v1/conversation/<int:pk>/", ConversationDetailAPIView.as_view(), name="conversation_detail_api"),
    path("v1/conversation/<int:convo_pk>/status/", StatusCreateAPIView.as_view(), name="status_api"),
    path("v1/conversation/<int:convo_pk>/message/", MessageCreateAPIView.as_view(), name="message_create_api"),
    path(
        "v1/conversation/<int:convo_pk>/message/<int:pk>/", MessageDeleteAPIView.as_view(), name="message_delete_api"
    ),
    path("v1/conversation/<int:convo_pk>/assignment/", AssignmentCreateAPIView.as_view(), name="assign_api"),
    path("v1/media/", UploadListCreateAPIView.as_view(), name="upload_api"),
    path("v1/media/<int:pk>/", UploadDetailAPIView.as_view(), name="upload_detail_api"),
]
