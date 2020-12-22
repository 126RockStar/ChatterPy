from rest_framework import serializers


def get_account_or_validation_error(user):
    try:
        account = user.account
        return account
    except:
        raise serializers.ValidationError("User has no Account")
