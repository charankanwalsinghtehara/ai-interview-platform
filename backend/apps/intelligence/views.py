from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.resumes.models import Resume
from .models import ResumeAnalysis
from .services.resume_analyzer import analyze_resume


class AnalyzeActiveResumeView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:
            resume = Resume.objects.get(
                user=request.user,
                is_active=True
            )

        except Resume.DoesNotExist:

            return Response(
                {
                    "error": "No active resume found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Analyze resume
        analysis_data = analyze_resume(
            resume.extracted_text
        )

        scores = analysis_data["scores"]

        # Save/update analysis
        analysis, created = ResumeAnalysis.objects.update_or_create(
            resume=resume,
            defaults={
                "skills": analysis_data["skills"],
                "categorized_skills": analysis_data[
                    "categorized_skills"
                ],
                "education": analysis_data["education"],
                "experience": analysis_data["experience"],
                "projects": analysis_data["projects"],

                "skills_score": scores["skills_score"],
                "education_score": scores["education_score"],
                "project_score": scores["project_score"],
                "experience_score": scores["experience_score"],
                "category_scores": scores["category_scores"],
                "overall_resume_score": scores[
                    "overall_resume_score"
                ],
            }
        )

        return Response(
            {
                "message": "Resume analyzed successfully",
                "resume_id": resume.id,

                "analysis": {
                    "skills": analysis.skills,

                    "categorized_skills":
                        analysis.categorized_skills,

                    "education": analysis.education,

                    "experience": analysis.experience,

                    "projects": analysis.projects,

                    "scores": {
                        "skills_score":
                            analysis.skills_score,

                        "education_score":
                            analysis.education_score,

                        "project_score":
                            analysis.project_score,

                        "experience_score":
                            analysis.experience_score,

                        "category_scores":
                            analysis.category_scores,

                        "overall_resume_score":
                            analysis.overall_resume_score,
                    },

                    "analyzed_at":
                        analysis.analyzed_at,
                }
            },
            status=status.HTTP_200_OK
        )