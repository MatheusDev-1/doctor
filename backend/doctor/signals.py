from django.db.models.signals import post_save
from django.dispatch import receiver
from doctor.models import Roles, Permissions, RolePermission

@receiver(post_save, sender=Permissions)
def assign_permission_to_roles(sender, instance, created, **kwargs):
    if created:
        roles = Roles.objects.all()
        
        for role in roles:
            RolePermission.objects.get_or_create(role=role, permission=instance)