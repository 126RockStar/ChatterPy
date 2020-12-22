# This is only needed if Viewsets are insufficient and Generic Class views are used instead
# from django.urls import path

# from .views import (
#     ContactListCreateAPIView,
#     ContactDetailAPIView,
#     CollectionsListCreateAPIView,
#     CollectionsDetailAPIView,
#     DNMListCreateAPIView,
#     DNMDetailAPIView,
# )

# urlpatterns = [
#     path("v1/contacts/", ContactListCreateAPIView.as_view(), name="contact_list_api"),
#     path("v1/contacts/<int:pk>/", ContactDetailAPIView.as_view(), name="contact_detail_api"),
#     path("v1/collections/", CollectionsListCreateAPIView.as_view(), name="collections_list_api"),
#     path("v1/collections/<int:pk>/", CollectionsDetailAPIView.as_view(), name="collections_detail_api"),
#     path("v1/dnm/", DNMListCreateAPIView.as_view(), name="dnm_list_api"),
#     path("v1/dnm/<int:pk>/", DNMDetailAPIView.as_view(), name="dnm_detail_api"),
# ]
