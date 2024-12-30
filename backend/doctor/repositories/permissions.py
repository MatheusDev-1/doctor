from doctor.models import Permissions

class PermissionsRepository:
    @staticmethod
    def get_all():
        return Permissions.objects.all()

    def get_permission_by_roles():
        permissions = Permissions.objects.values("id", "role", "action", "type", "display_text", "is_active")

        grouped_permissions = {
            "types": ["triage", "diagnosis", "permissions"],
            "permissions": {
                "triage": {
                    "can_view_triage": [],
                    "can_update_triage": [],
                    "can_delete_triage": [],
                    "can_add_triage": []
                },
                "diagnosis": {
                    "can_view_diagnosis": [],
                    "can_add_diagnosis": [],
                    "can_update_diagnosis": []
                },
                "permissions": {
                    "can_view_permissions": [],
                    "can_update_permissions": []
                },
            }
        }

        for perm in permissions:
            id = perm['id']
            permission_type = perm["type"]
            role = perm["role"]
            action = perm["action"]
            display_text = perm["display_text"]
            is_active = perm["is_active"]
            grouped_permissions["permissions"][permission_type][action].append({
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
        permissions = Permissions.objects.filter(role=role)

        result = {}

        for permission in permissions:
            result[permission.action] = permission.is_active

        return result
    
    @staticmethod
    def update_permissions(permissions):
        permission_ids = [perm['id'] for perm in permissions]
        permissions_to_update = Permissions.objects.filter(id__in=permission_ids)

        id_to_is_active = {perm['id']: perm['is_active'] for perm in permissions}

        for permission in permissions_to_update:
            permission.is_active = id_to_is_active[permission.id]

        permissions = Permissions.objects.bulk_update(permissions_to_update, ['is_active'])