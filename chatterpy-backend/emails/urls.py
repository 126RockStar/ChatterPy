from django.urls import path
from .views import incoming_message, incoming_emails, message_status

urlpatterns = [
    path("incoming-message/3VPt0RIy43ZdBcNR", incoming_message),
    path("incoming-emails/V623LVzvFzMN7BAP", incoming_emails),
    path("message-status/44", message_status)
]