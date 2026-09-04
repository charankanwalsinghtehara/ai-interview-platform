from django.conf import settings
from django.db import models


class Interview(models.Model):

    STATUS_CHOICES = [
        ("started", "Started"),
        ("completed", "Completed"),
    ]

    ROLE_CHOICES = [
        ("Data Analyst", "Data Analyst"),
        ("Business Analyst", "Business Analyst"),
        ("Data Scientist", "Data Scientist"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="interviews"
    )

    role = models.CharField(
        max_length=100,
        choices=ROLE_CHOICES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="started"
    )

    started_at = models.DateTimeField(
        auto_now_add=True
    )

    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"


class InterviewQuestion(models.Model):

    interview = models.ForeignKey(
        Interview,
        on_delete=models.CASCADE,
        related_name="questions"
    )

    question_text = models.TextField()

    question_order = models.PositiveIntegerField()

    category = models.CharField(
        max_length=100,
        blank=True
    )

    skill = models.CharField(
        max_length=100,
        blank=True
    )

    difficulty = models.CharField(
        max_length=50,
        default="easy"
    )

    def __str__(self):

        return (
            f"{self.interview.role} - "
            f"Question {self.question_order}"
        )

class InterviewAnswer(models.Model):

    question = models.OneToOneField(
        InterviewQuestion,
        on_delete=models.CASCADE,
        related_name="answer"
    )

    answer_text = models.TextField()

    answered_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"Answer for Question {self.question.id}"
        )