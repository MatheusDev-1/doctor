from doctor.repositories.roles import RolesRepository

class RolesService:
    @staticmethod
    def list_roles():
        return RolesRepository.get_all()

    @staticmethod
    def get_role(role_id):
        role = RolesRepository.get_by_id(role_id)
        if not role:
            raise ValueError("Role not found")
        return role

    @staticmethod
    def create_role(data):
        return RolesRepository.create(data)

    @staticmethod
    def remove_role(role_id):
        role = RolesRepository.delete(role_id)
        if not role:
            raise ValueError("Role not found")
        return role