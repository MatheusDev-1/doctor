from django.db import models
from doctor.models import Users

class Triages(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name="triages")
    priority = models.CharField(max_length=50)
    in_treatment = models.BooleanField(default=False)
    triage_notes = models.TextField(max_length=500, blank=True, null=True)
    diagnosis_notes = models.TextField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Triage {self.id} for User {self.user.email}"