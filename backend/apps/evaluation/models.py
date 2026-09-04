from django.db import models

from apps.interviews.models import (
    Interview,
    InterviewAnswer
)


class AnswerEvaluation(models.Model):

    answer = models.OneToOneField(
        InterviewAnswer,
        on_delete=models.CASCADE,
        related_name="evaluation"
    )

    word_count = models.PositiveIntegerField(default=0)

    length_score = models.FloatField(default=0)

    keyword_score = models.FloatField(default=0)

    final_score = models.FloatField(default=0)

    evaluated_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Evaluation - Answer {self.answer.id}"


class InterviewReport(models.Model):

    interview = models.OneToOneField(
        Interview,
        on_delete=models.CASCADE,
        related_name="evaluation_report"
    )

    overall_score = models.FloatField(default=0)

    performance_level = models.CharField(
        max_length=50,
        default="Needs Improvement"
    )

    total_questions = models.PositiveIntegerField(
        default=0
    )

    evaluated_answers = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return (
            f"{self.interview.user.username} - "
            f"{self.overall_score}%"
        )