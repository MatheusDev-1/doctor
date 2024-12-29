from doctor.repositories.permissions import PermissionsRepository

class PermissionsService:
    @staticmethod
    def list_permissions():
        return PermissionsRepository.get_roles_by_permission()

    @staticmethod
    def get_permissions_by_role(role):
        permission = PermissionsRepository.get_by_role(role)
        
        if not permission:
            raise ValueError("Permission not found")
        return permission
    
    