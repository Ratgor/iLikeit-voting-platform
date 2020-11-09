from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets # RTG: first way
from rest_framework import generics # RTG: second way
from rest_framework import permissions # RTG: compatibility with login

from .serializers import PostSerializer
from .models import Post
from .mixins import CountModelMixin


class PostView1(viewsets.ModelViewSet, CountModelMixin): # RTG: first way
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  permission_classes = [permissions.AllowAny, ]

class PostView2(generics.ListCreateAPIView, CountModelMixin): # RTG: second way
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  permission_classes = [permissions.AllowAny, ]
