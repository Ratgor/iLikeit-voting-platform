from django.urls import path
from . import views

urlpatterns = [
    path('api/about/', views.PostView1.as_view({'get': 'list'})),
    path('api/about2/', views.PostView2.as_view()),
]
