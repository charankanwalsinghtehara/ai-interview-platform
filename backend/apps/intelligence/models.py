from django.db import models

from apps.resumes.models import Resume


class ResumeAnalysis(models.Model):

    resume = models.OneToOneField(
        Resume,
        on_delete=models.CASCADE,
        related_name="analysis"
    )

    # Extracted information
    skills = models.JSONField(default=list)

    categorized_skills = models.JSONField(default=dict)

    education = models.JSONField(default=list)

    experience = models.JSONField(default=list)

    projects = models.JSONField(default=list)

    # Scores
    skills_score = models.FloatField(default=0)

    education_score = models.FloatField(default=0)

    project_score = models.FloatField(default=0)

    experience_score = models.FloatField(default=0)

    category_scores = models.JSONField(default=dict)

    overall_resume_score = models.FloatField(default=0)

    analyzed_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Analysis for Resume {self.resume.id}"