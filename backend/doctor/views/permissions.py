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
            serializer = PermissionSerializer(permissions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        permissions = self.permission_service.list_permissions()
        return Response(permissions, status=status.HTTP_200_OK)
    