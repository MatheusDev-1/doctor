from doctor.models import Permissions

class PermissionsRepository:
    @staticmethod
    def get_all():
        return Permissions.objects.all()

    def get_roles_by_permission():
        permissions = Permissions.objects.values("id", "role", "action", "type", "display_text", "is_active")

        grouped_permissions = {
            "triage": {"admin": [], "doctor": [], "nurse": [], "patient": []},
            "diagnosis": {"admin": [], "doctor": [], "nurse": [], "patient": []},
            "permissions": {"admin": [], "doctor": [], "nurse": [], "patient": []},
        }

        for perm in permissions:
            id = perm['id']
            permission_type = perm["type"]
            role = perm["role"]
            action = perm["action"]
            display_text = perm["display_text"]
            is_active = perm["is_active"]
            grouped_permissions[permission_type][role].append({
                "id":  id,
                "action": action,
                "role": role,
                "type": permission_type,
                "display_text": display_text,
                "is_active": is_active
            })

        return grouped_permissions
    

    @staticmethod
    def get_by_role(role):
        return Permissions.objects.filter(role=role)