from doctor.repositories.permissions import PermissionsRepository

class PermissionsService:
    @staticmethod
    def list_permissions():
        return PermissionsRepository.get_permission_by_roles()

    @staticmethod
    def get_permissions_by_role(role):
        permission = PermissionsRepository.get_by_role(role)
        
        if not permission:
            raise ValueError("Permission not found")
        return permission
    
    @staticmethod
    def update_bulk_permissions(permissions):
        PermissionsRepository.update_permissions(permissions)

    