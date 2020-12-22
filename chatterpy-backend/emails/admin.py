from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin
from .models import Template, Email, Datasource


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    model = Template
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    model = Email
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "name",
        "created",
    )

    list_filter = ("created",)


@admin.register(Datasource)
class DatasourceAdmin(admin.ModelAdmin, DynamicArrayMixin):
    model = Datasource
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "name",
        "created",
    )
    list_filter = ("created",)
