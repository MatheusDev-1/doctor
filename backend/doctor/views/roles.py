from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from doctor.services.roles import RolesService
from doctor.serializers.roles import RoleSerializer

class RoleView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        self.role_service = RolesService

    def get(self, request):
        roles = self.role_service.list_roles()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        role = self.role_service.create_role(data)
        serializer = RoleSerializer(role)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)