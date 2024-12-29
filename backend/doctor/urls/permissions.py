from django.urls import path
from doctor.views.permissions import PermissionView

urlpatterns = [
    path('', PermissionView.as_view(), name='get_permissions'),
]