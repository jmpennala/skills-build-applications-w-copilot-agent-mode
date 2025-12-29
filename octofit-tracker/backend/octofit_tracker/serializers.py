from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='pk', read_only=True)
    class Meta:
        model = Team
        fields = ['_id', 'name']

class UserSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='pk', read_only=True)
    team = serializers.CharField(source='team._id', read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'team']

class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='pk', read_only=True)
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'difficulty']

class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='pk', read_only=True)
    user = serializers.CharField(source='user._id', read_only=True)
    workout = serializers.CharField(source='workout._id', read_only=True)
    class Meta:
        model = Activity
        fields = ['_id', 'user', 'workout', 'date', 'duration', 'points']

class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.CharField(source='pk', read_only=True)
    team = serializers.CharField(source='team._id', read_only=True)
    class Meta:
        model = Leaderboard
        fields = ['_id', 'team', 'total_points']
