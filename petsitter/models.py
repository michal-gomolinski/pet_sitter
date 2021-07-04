from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import CharField
from django.utils import timezone


class BlogPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(
        default=timezone.now
    )
    body = models.CharField(default='', max_length=200)

    def __str__(self):
        return self.body


class Pet(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    species = models.CharField(max_length=255)


class Human(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    rate_per_hour = models.PositiveIntegerField(default='0')
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    picture = models.ImageField(upload_to='images/',blank = True)

    city_choices = [('WWA', 'Warszawa'),
                    ('KRAK','Krakow'),
                    ('WROC','Wroclaw')]

    city = models.CharField(max_length=4,
                            choices=city_choices,
                            default='WWA')
    