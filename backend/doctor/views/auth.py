from rest_framework import generics
from rest_framework.permissions import AllowAny
from doctor.serializers.auth import RegisterSerializer, CustomTokenObtainPairSerializer
from doctor.models.users import Users
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer