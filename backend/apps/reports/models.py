from django.conf import settings
from django.db import models


class CandidateReport(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="candidate_reports"
    )

    resume_score = models.FloatField(
        default=0
    )

    skill_score = models.FloatField(
        default=0
    )

    career_score = models.FloatField(
        default=0
    )

    interview_score = models.FloatField(
        default=0
    )

    final_score = models.FloatField(
        default=0
    )

    candidate_level = models.CharField(
        max_length=50,
        default="Needs Improvement"
    )

    recommended_role = models.CharField(
        max_length=100,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return (
            f"{self.user.username} - "
            f"{self.final_score}%"
        )