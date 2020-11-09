from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
]

# handle the routes are defined in the React Routed
# gag: jest redirect all that to fromtend
urlpatterns += [
    # match the root
    #re_path(r'^$', include('frontend2.urls')),
    # match all other pages
    #re_path(r'^(?:.*)/?$', include('frontend2.urls')),
    #re_path(r'^(account|login|people|ideas|notes|add-person|add-idea|timetable|about)/?$', include('frontend2.urls')),
    path('user/', views.index, name='user'),
    path('login/', views.index, name='login'),
    path('people/', views.index, name='people'),
    path('ideas/', views.index, name='ideas'),
    path('notes/', views.index, name='notes'),
    path('add-person/', views.index, name='add-person'),
    path('add-idea/', views.index, name='add-idea'),
    path('time/', views.index, name='time'),
    path('about/', views.index, name='about'),
]
