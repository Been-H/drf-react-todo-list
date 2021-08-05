from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse

from .models import Task

from rest_framework.decorators import api_view
from rest_framework.response import Response
from.serializers import TaskSerializer

@api_view(['GET', 'POST'])
def api_overview(request):
    api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
        'Update':'/task-update/',
		'Delete':'/task-delete/<str:pk>/',
		}

    return Response(api_urls)

@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def task_detail(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task)
    return Response(serializer.data)

@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)
    
    if serializer.is_valid():
        print('saving')
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def task_update(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
   
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def task_delete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response('Item succesfully deleted!')