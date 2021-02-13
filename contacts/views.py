from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, permissions, authentication

from .models import Contact, Feature
from .serializers import ContactSerializer, FeatureSerializer
from .permissions import IsOwner, IsStaff
from .mixins import CountModelMixin


class ContactsViewSet(viewsets.ModelViewSet, CountModelMixin):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    authentication_classes = [authentication.TokenAuthentication,]
    permission_classes = [(permissions.IsAuthenticated & (IsOwner | IsStaff)),]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Contact.objects.all()
        else:
            return self.request.user.contacts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
