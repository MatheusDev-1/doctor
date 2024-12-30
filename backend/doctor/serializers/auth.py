from rest_framework import serializers
from doctor.models.users import Users
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from doctor.utils.email_utils import send_email
from doctor.utils.token import generate_token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Users.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])

    class Meta:
        model = Users
        fields = ('email', 'first_name', 'password', 'last_name', 'sex', 'birth_date', 'role')

    def create(self, data):
        user = Users.objects.create(**data) 
        password = data['password'] if 'password' in data else None

        if not password:
            password = generate_token()
            
        user.set_password(password)
        user.save()

        send_email(to_email=data['email'], data={
            "token": password 
        })

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user'] = {}
        
        token['user']['email'] = user.email
        token['user']['is_staff'] = user.is_staff
        token['user']['is_active'] = user.is_active
        token['user']['full_name'] = f"{user.first_name} {user.last_name}"
        token['user']['first_name'] = user.first_name
        token['user']['last_name'] = user.last_name
        token['user']['role'] = user.role

        return token