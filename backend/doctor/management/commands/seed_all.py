from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Runs all seed scripts'

    def handle(self, *args, **kwargs):
        seed_commands = [
            'seed_users',
            'seed_permissions',
            'seed_roles'
        ]

        for command in seed_commands:
            try:
                self.stdout.write(f"Running seed: {command}")
                call_command(command)
                self.stdout.write(self.style.SUCCESS(f"Successfully ran {command}\n"))
            except CommandError as e:
                self.stdout.write(self.style.ERROR(f"Failed to run {command}: {e}\n"))