from django.db import models 
from doctor.models.roles import Roles

class Permissions(models.Model):
    role = models.CharField(max_length=100)
    action = models.CharField(max_length=80)
    display_text = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.role} - {self.action}"
    
class RolePermission(models.Model):
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permissions, on_delete=models.CASCADE)