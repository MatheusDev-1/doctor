from django.urls import include, path

urlpatterns = [
    path('api/v1/auth/', include('doctor.urls.auth')),
    path('api/v1/roles/', include('doctor.urls.roles')),
    path('api/v1/permissions/', include('doctor.urls.permissions'))
]