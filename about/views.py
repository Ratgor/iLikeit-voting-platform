from django.shortcuts import render

# Create your views here.


from rest_framework import viewsets # RTG: first way
from rest_framework import generics # RTG: second way
from rest_framework import permissions # RTG: compatibility with login
from .serializers import PostSerializer
from .models import Post

class PostView1(viewsets.ModelViewSet): # RTG: first way
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  permission_classes = [permissions.AllowAny, ]

class PostView2(generics.ListCreateAPIView): # RTG: second way
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  permission_classes = [permissions.AllowAny, ]
