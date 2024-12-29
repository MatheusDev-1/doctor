from django.urls import path
from doctor.views.roles import RoleView

urlpatterns = [
    path('', RoleView.as_view(), name='get_roles')
]