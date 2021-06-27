from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'posts', views.BlogPostViewSet)
router.register(r'pets', views.PetViewSet)
router.register(r'humans', views.HumanViewSet)
router.register(r'users', views.UserViewSet)




urlpatterns = [
    path(r'api/pets-for-user', views.getUserPets,name="pets-for-user"),
    path(r'api/profile',views.getHumanProfile,name="profile"),
    path(r'api/', include(router.urls)),
    path(r'', views.index, name='index'),
    path(r'sign-up', views.index, name='index'),
    path(r'sign-in', views.index, name='index'),
    path(r'pets', views.index, name='index'),
    path(r'humans', views.index, name='index'),
    path(r'profile', views.index, name='index'),
]