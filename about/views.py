from django.shortcuts import render

# Create your views here.


from rest_framework import viewsets # RTG: first way
from rest_framework import generics # RTG: second way
from .serializers import PostSerializer
from .models import Post

class PostView1(viewsets.ModelViewSet): # RTG: first way
  serializer_class = PostSerializer
  queryset = Post.objects.all()

class PostView2(generics.ListCreateAPIView): # RTG: second way
  serializer_class = PostSerializer
  queryset = Post.objects.all()
