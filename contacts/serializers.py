from rest_framework import serializers

from .models import Contact, Feature

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'owners',
            'relatedUsers',
        ]

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        moedel = Feature
        fields = [
            'relatedContacts',
            'header',
            'content',
            'tags',
            'date',
            'verified',
            'encrypted',
        ]
