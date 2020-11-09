from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.PostView1.as_view({'get': 'list'})),
    path('about2/', views.PostView2.as_view()),
]


# RTG: third way, like in notes example

from django.conf.urls import include, url
from rest_framework import routers

from .views import PostView1

router = routers.DefaultRouter()
router.register('about', PostView1, 'about')

urlpatterns += [
    url("^", include(router.urls)),
]
