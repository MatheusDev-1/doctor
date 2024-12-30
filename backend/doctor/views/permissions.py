from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from doctor.services.permissions import PermissionsService
from doctor.serializers.permissions import PermissionSerializer

class PermissionView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        self.permission_service = PermissionsService

    def get(self, request):
        role = request.GET.get('role', '')

        if role:
            permissions = self.permission_service.get_permissions_by_role(role)

            return Response(permissions, status=status.HTTP_200_OK)

        permissions = self.permission_service.list_permissions()
        return Response(permissions, status=status.HTTP_200_OK)

    def post(self, request):
        permissions = request.data

        self.permission_service.update_bulk_permissions(permissions)

        return Response({"message": "Updated successfully"}, status=status.HTTP_201_CREATED)
    