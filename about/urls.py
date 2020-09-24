from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.PostView1.as_view({'get': 'list'})),
    path('about2/', views.PostView2.as_view()),
]
