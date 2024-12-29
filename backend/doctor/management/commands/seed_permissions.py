from django.core.management.base import BaseCommand
from doctor.models import Permissions

class Command(BaseCommand):
    help = 'Seed the database with permissions'

    def get_display_text(self, action):
        text_with_spaces = action.replace('_', ' ')
        text_capitalized = text_with_spaces.capitalize()
        return text_capitalized
    
    def get_type(self, action):
        return action.split('_')[-1]

    def handle(self, *args, **kwargs):
        actions = [
            "can_view_triage", "can_add_triage", "can_update_triage", "can_delete_triage",
            "can_view_diagnosis", "can_add_diagnosis", "can_update_diagnosis",
            "can_view_permissions", "can_update_permissions"
        ]

        roles = ['admin', 'doctor', 'nurse', 'patient']

        permissions = []

        for role in roles:
            for action in actions:
                permissions.append({"role": role, "action": action, "display_text": self.get_display_text(action), "type": self.get_type(action)})

        for permission in permissions:
            obj, created = Permissions.objects.get_or_create(
                role=permission["role"],
                action=permission["action"],
                type=permission["type"],
                display_text=permission["display_text"],
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"{permission['role']} | Permission '{permission['action']}' created successfully.\n"))
            else:
                self.stdout.write(self.style.WARNING(f"{permission['role']} | Permission '{permission['action']}' already exists.\n"))