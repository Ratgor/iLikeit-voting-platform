#from django.conf.urls import include, url
#from rest_framework import routers

from django.urls import path
from .views import searchView

#router = routers.DefaultRouter()
#router.register('search', searchView, 'search')

#urlpatterns = [
#    url("^", include(router.urls)),
#]
urlpatterns = [
    path('search/', searchView),
]
