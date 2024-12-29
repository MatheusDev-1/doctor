from doctor.models.roles import Roles

class RolesRepository:
    @staticmethod
    def get_all():
        return Roles.objects.all()

    @staticmethod
    def get_by_id(role_id):
        return Roles.objects.filter(id=role_id).first()

    @staticmethod
    def create(data):
        return Roles.objects.create(**data)

    @staticmethod
    def delete(role_id):
        roles = Roles.objects.filter(id=role_id).first()
        if roles:
            roles.delete()
        return roles