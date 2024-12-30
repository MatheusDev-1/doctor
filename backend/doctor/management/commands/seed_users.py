from django.core.management.base import BaseCommand
from doctor.models import Users

class Command(BaseCommand):
    help = 'Seed the database with users'

    def handle(self, *args, **kwargs):
        users = [
            {"role": "admin", "email": "admin@lilium.com", "password": "admin#123456", "first_name": "Admin", "last_name": "Lilium", "sex": "male", "birth_date": "1990-02-05"},
            {"role": "doctor", "email": "doctor@lilium.com", "password": "doctor#123456", "first_name": "Doctor", "last_name": "Lilium", "sex": "male", "birth_date": "1990-02-05"},
            {"role": "nurse", "email": "nurse@lilium.com", "password": "nurse#123456", "first_name": "Nurse", "last_name": "Lilium", "sex": "female", "birth_date": "1990-02-05"},
            {"role": "patient", "email": "patient@lilium.com", "password": "patient#123456", "first_name": "Patient", "last_name": "Lilium", "sex": "male", "birth_date": "1990-02-05"},
        ]

        for user in users:
            obj, created = Users.objects.get_or_create(
                role=user["role"],
                email=user["email"],
                first_name=user["first_name"],
                last_name=user["last_name"],
                sex=user["sex"],
                birth_date=user["birth_date"],
            )
            if created:
                obj.set_password(user["password"])
                obj.save()
                self.stdout.write(self.style.SUCCESS(f"User '{user['email']}' created successfully."))
            else:
                self.stdout.write(self.style.WARNING(f"User '{user['email']}' already exists."))