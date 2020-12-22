from rest_framework import permissions


class ManagerRequiredDeletion(permissions.BasePermission):
    """
    Object-level permission to only allow managers of an object to delete it.
    Assumes the user instance has an `is_account_manager` attribute.
    """

    message = "User must be account manager for request"

    def has_object_permission(self, request, view, obj):
        if request.method == "DELETE":
            return request.user.is_account_manager
        else:
            return True


class ManagerOrSafe(permissions.BasePermission):
    """
    Object-level permission to only allow managers of an object to edit it.
    Assumes the user instance has an `is_account_manager` attribute.
    """

    message = "User must be account manager for request"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_account_manager


class ManagerOrSelf(permissions.BasePermission):
    """
    Object-level permission to allow acccount managers and Self to edit/delete
    Assumes the user instance has an `is_account_manager` attribute.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_account_manager and request.user.account == obj.account or obj.id == request.user.id


class IsManager(permissions.BasePermission):
    """
    Object-level permission to only allow managers of an object to see and edit it.
    Assumes the user instance has an `is_account_manager` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return request.user.is_account_manager


class IsAssignedUser(permissions.BasePermission):
    """
    Object-level permission to only allow managers of an object to edit it.
    Assumes the user instance has an `is_account_manager` attribute.
    """

    def has_object_permission(self, request, view, obj):
        return obj.assignment.filter(active=True, assigned_to=request.user).exists()  # filter(active=True)


class IsOpen(permissions.BasePermission):
    """
    Object-level permission to only allow managers of an object to edit it.
    Assumes the user instance has an `is_account_manager` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # return request.user in obj.assigned.all().filter(active=True)
        return obj.status.filter(active=True, state="Open").exists()  # filter(active=True)


class IsOpenOrIsAssigned(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return IsOpen.has_object_permission(self, request, view, obj) or IsAssignedUser.has_object_permission(
            self, request, view, obj
        )
