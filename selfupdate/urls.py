from django.urls import path

from . import views

urlpatterns = [
    path('selfupdate/', views.selfupdate),
    #path('selfupdate2/', views.webhook),
]

# backup from main urls.py
# from selfupdate import views as selfupdate_views
# from django.conf.urls import url
# url(r'^selfupdate', selfupdate_views.webhook, name='webhook'),
