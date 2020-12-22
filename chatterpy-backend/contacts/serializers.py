from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from chatterpy.AccountManager import verify_number_format

from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

from chatterpy.extras import get_account_or_validation_error
from .models import Collection, Contact, DNM

User = get_user_model()


class ContactCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "account",
            "created",
            "updated",
        ]
        read_only_fields = ("id", "updated", "created", "account")


class CollectionBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id", "name", "created", "updated"]
        extra_kwargs = {
            "id": {"read_only": False, "required": True},
            "name": {"required": False},
        }


class CollectionSerializer(serializers.ModelSerializer):
    contacts = ContactCollectionSerializer(many=True)

    @classmethod
    def many_init(cls, *args, **kwargs):
        kwargs["child"] = cls()
        kwargs["child"].fields.pop("contacts")
        return serializers.ListSerializer(*args, **kwargs)

    class Meta:
        model = Collection
        fields = ["id", "name", "created", "contacts", "updated", "account"]
        read_only_fields = ("id", "updated", "contacts", "created", "account")

    def create(self, validated_data):
        account = get_account_or_validation_error(self.context["request"].user)
        return Collection.objects.create(**validated_data, account=account)

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance


class ContactSerializer(TaggitSerializer, serializers.ModelSerializer):
    collection = CollectionBaseSerializer(many=True, required=False)
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Contact
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "account",
            "collection",
            "tags",
            "created",
            "updated",
        ]
        read_only_fields = ("id", "updated", "created", "account")
        extra_kwargs = {
            "collection": {"required": False},
            "tags": {"required": False},
        }

    def create(self, validated_data):
        collection_list = []
        account = get_account_or_validation_error(self.context["request"].user)

        if validated_data.get("collection") or validated_data.get("collection") == []:
            collection_list = validated_data.pop("collection")

        print(validated_data)
        validated_data["phone_number"] = verify_number_format(str(validated_data["phone_number"]))
        new_contact = Contact.objects.create(**validated_data, account=account)
        for collection in collection_list:
            new_contact.collection.add(collection)
        return new_contact

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.phone_number = validated_data.get("phone_number", instance.phone_number)
        instance.email = validated_data.get("email", instance.email)
        collection_list = validated_data.get("collection")
        updated_tags = validated_data.get("tags")

        if updated_tags or updated_tags == []:
            instance.tags.set(*updated_tags, clear=True)

        # Manage Collection Membership
        if collection_list or collection_list == []:
            ThroughModel = Contact.collection.through
            to_create = []
            to_delete = instance.collection.all()
            for collection in collection_list:
                if not collection in instance.collection.all():
                    to_create.append(
                        ThroughModel(
                            created_by_id=self.context["request"].user.pk,
                            contact_id=instance.pk,
                            collection_id=collection["id"],
                        )
                    )
                else:
                    to_delete.remove(collection)
            ThroughModel.objects.bulk_create(to_create)
            for element in to_delete:
                instance.collection.remove(element)
        instance.save()
        return instance

    def validated_tags(self, tags):
        if tags == None:
            return []
        return tags


class DNMSerializer(serializers.ModelSerializer):
    class Meta:
        model = DNM
        fields = [
            "id",
            "phone_number",
            "account",
            "created",
        ]
        read_only_fields = ("id", "created", "account")

    def create(self, validated_data):
        account = get_account_or_validation_error(self.context["request"].user)
        return DNM.objects.create(**validated_data, account=account)

    def update(self, instance, validated_data):
        instance.phone_number = validated_data.get("phone_number", instance.phone_number)
        instance.save()
        return instance
