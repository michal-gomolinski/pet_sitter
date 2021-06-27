from rest_framework import permissions

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')


class ReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return (
            request.method in SAFE_METHODS
        )
class IsAuthenticatedOrWriteOnly(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a write-only request.
    """

    def has_permission(self, request, view):
        WRITE_METHODS = ["POST", ]

        return (
            request.method in WRITE_METHODS 
        )