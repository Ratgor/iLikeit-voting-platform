from django.conf.urls import include, url

from rest_framework import routers

from .views import ContactsViewSet

contactsRouter = routers.DefaultRouter()
contactsRouter.register('contacts', ContactsViewSet, 'contacts')
# params above: url endpoint, conntected API, default queryset

urlpatterns = [
    url('^', include(contactsRouter.urls)),
]


#urlpatterns = [
#    path('snippets/', views.snippet_list),
#    path('snippets/<int:pk>/', views.snippet_detail),
#]
