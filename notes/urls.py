# RTG: endpoints.py, accordinc to the example http://v1k45.com/blog/modern-django-part-3-creating-an-api-and-integrating-with-react/

from django.conf.urls import include, url
from rest_framework import routers

from .views import NoteViewSet

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')

urlpatterns = [
    url("^", include(router.urls)),
]
