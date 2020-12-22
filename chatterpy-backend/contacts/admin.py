from django.contrib import admin
from .models import Contact, Collection, DNM


class CollectionInline(admin.TabularInline):
    model = Contact.collection.through
    extra = 3


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    model = Contact
    readonly_fields = ("created", "id")
    inlines = (CollectionInline,)
    list_display = (
        "id",
        "phone_number",
        "first_name",
        "last_name",
        "created",
    )
    list_filter = ("created",)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    model = Collection
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "created",
    )
    list_filter = ("created",)


@admin.register(DNM)
class DNMAdmin(admin.ModelAdmin):
    model = DNM
    readonly_fields = ("created", "id")
    list_display = (
        "id",
        "phone_number",
        "created",
    )
    list_filter = ("created",)
