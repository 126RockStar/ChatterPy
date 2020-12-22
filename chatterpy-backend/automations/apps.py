from django.apps import AppConfig


class AutomationsConfig(AppConfig):
    name = "automations"

    def ready(self):
        from . import signals
