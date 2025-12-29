from django.db import models
from djongo import models as djongo_models

class Team(models.Model):
	_id = djongo_models.ObjectIdField(primary_key=True, editable=False)
	name = models.CharField(max_length=100, unique=True)

class User(models.Model):
	_id = djongo_models.ObjectIdField(primary_key=True, editable=False)
	name = models.CharField(max_length=100)
	email = models.EmailField(unique=True)
	team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members', to_field='_id')

class Workout(models.Model):
	_id = djongo_models.ObjectIdField(primary_key=True, editable=False)
	name = models.CharField(max_length=100)
	description = models.TextField()
	difficulty = models.CharField(max_length=50)

class Activity(models.Model):
	_id = djongo_models.ObjectIdField(primary_key=True, editable=False)
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities', to_field='_id')
	workout = models.ForeignKey(Workout, on_delete=models.CASCADE, to_field='_id')
	date = models.DateTimeField()
	duration = models.IntegerField(help_text='Duration in minutes')
	points = models.IntegerField(default=0)

class Leaderboard(models.Model):
	_id = djongo_models.ObjectIdField(primary_key=True, editable=False)
	team = models.ForeignKey(Team, on_delete=models.CASCADE, to_field='_id')
	total_points = models.IntegerField(default=0)