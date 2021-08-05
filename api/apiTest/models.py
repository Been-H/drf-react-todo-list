from django.db import models

class Task(models.Model):
    text = models.CharField(max_length=120)
    day = models.CharField(max_length=120)

    def __str__(self):
        return self.title