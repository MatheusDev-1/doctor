from django.core.management.base import BaseCommand
from doctor.models.roles import Roles

class Command(BaseCommand):
    help = 'Seed the database with roles'

    def handle(self, *args, **kwargs):
        roles = [
            {"name": "admin"},
            {"name": "doctor"},
            {"name": "nurse"},
            {"name": "patient"},
        ]

        for role in roles:
            obj, created = Roles.objects.get_or_create(name=role["name"])
            if created:
                self.stdout.write(self.style.SUCCESS(f"Role '{role['name']}' created successfully."))
            else:
                self.stdout.write(self.style.WARNING(f"Role '{role['name']}' already exists."))