from rest_framework import serializers
from doctor.models import Roles

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['id', 'name', 'created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data