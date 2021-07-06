from django.http import response
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from .models import BlogPost, Human, Pet
from . import serializers
from .permissions import IsAuthenticatedOrWriteOnly
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
def index(request, path=''):
    return render(request, 'index.html')


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.AllowAny,)



class BlogPostViewSet(viewsets.ModelViewSet):

    queryset = BlogPost.objects.all()
    serializer_class = serializers.BlogPostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PetViewSet(viewsets.ModelViewSet):

    queryset = Pet.objects.all()
    serializer_class = serializers.PetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HumanViewSet(viewsets.ModelViewSet):
    parser_class = (FormParser,MultiPartParser,JSONParser)
    queryset = Human.objects.all()
    serializer_class = serializers.HumanSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def put(self, request, pk = None, format=None):
        serializer = serializers.HumanSerializer(data=self.request.data)
        humans = Human.objects.filter(user=self.request.user)

        if humans.count() > 0 :
            return Response('User already has a profile',status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response('serializer.data', status=status.HTTP_201_CREATED)
        return Response('User already has a profile',status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def getUserPets(request):
    permissions_classes = (permissions.IsAuthenticated)

    if request.user.is_anonymous:
        return Response('User not logged in',status=status.HTTP_401_UNAUTHORIZED)
    
    
    pets = Pet.objects.filter(user=request.user)
    serializer = serializers.PetSerializer(pets,many=True)
    return Response(serializer.data)

@api_view(['GET','HEAD'])
def getHumanProfile(request):
    permissions_classes = (permissions.AllowAny)

    if request.user.is_anonymous:
        return Response('User not logged in',status=status.HTTP_401_UNAUTHORIZED)

    human = Human.objects.filter(user=request.user)

    serializer = serializers.HumanSerializer(human,many=True)
    if(serializer.data):
        return Response(serializer.data[0])
    return Response({'error':'No user profile'},status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getUser(request,username):
    try:
        user = User.objects.get(username=username)
    except :
        return Response('no such user',status=status.HTTP_401_UNAUTHORIZED)

