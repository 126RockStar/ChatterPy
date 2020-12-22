"""chatterpy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from dj_rest_auth.registration.views import VerifyEmailView

from accounts import viewsets as account_viewsets
from contacts import views as contacts_viewsets
from automations import views as automations_viewsets
from emails import views as email_viewsets

# from contact import views as contact_viewsets
# from chat import views as chat_viewsets

router = routers.DefaultRouter()
router.register(r"users", account_viewsets.UserViewSet)
router.register(r"accounts", account_viewsets.AccountViewSet)
router.register(r"numbers", account_viewsets.NumberViewSet)
router.register(r"contacts", contacts_viewsets.ContactViewSet)
router.register(r"collections", contacts_viewsets.CollectionViewSet)
router.register(r"DNM", contacts_viewsets.DNMViewSet)
router.register(r"automations", automations_viewsets.AutomationViewSet)
router.register(r"datasources", email_viewsets.DataSourceViewSet)
router.register(r"emails", email_viewsets.EmailViewSet)
router.register(r"templates", email_viewsets.TemplateViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("v1/", include(router.urls)),
    path("api/", include(("conversations.urls", "conversations"), namespace="conversations")),
    # path("api/", include("automations.urls")),
    # path("api/", include("contacts.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/account-confirm-email/", VerifyEmailView.as_view(), name="account_email_verification_sent"),
    path("accounts/", include("accounts.urls")),
    path("auto/", include("emails.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


"""chatterpy_test URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
