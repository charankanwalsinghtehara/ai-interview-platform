from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.resumes.models import Resume
from apps.analytics.services.analytics_engine import generate_analytics
from apps.analytics.services.powerbi_data import prepare_powerbi_data
from apps.analytics.services.career_analyzer import (
    analyze_all_roles
)

from apps.analytics.services.skill_gap import (
    generate_skill_gap_report
)

from apps.analytics.services.powerbi_career_data import (
    prepare_powerbi_career_data
)


class AnalyticsDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

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

        # Check if analysis exists
        try:
            analysis = resume.analysis

        except Exception:

            return Response(
                {
                    "error": (
                        "Resume has not been analyzed yet. "
                        "Please run resume analysis first."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        analytics_data = generate_analytics(analysis)

        return Response(
            {
                "resume_id": resume.id,
                "analytics": analytics_data,
            },
            status=status.HTTP_200_OK
        )


class PowerBIDataView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:

            resume = Resume.objects.get(
                user=request.user,
                is_active=True
            )

            analysis = resume.analysis

        except Resume.DoesNotExist:

            return Response(
                {
                    "error": "No active analyzed resume found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        data = prepare_powerbi_data(analysis)

        return Response(
            {
                "resume_id": resume.id,
                "data": data
            }
        )


class CareerAnalyticsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:

            resume = Resume.objects.get(
                user=request.user,
                is_active=True
            )

            analysis = resume.analysis

        except Resume.DoesNotExist:

            return Response(
                {
                    "error": "No active resume found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Get all extracted skills
        user_skills = analysis.skills

        # Analyze career roles
        career_data = analyze_all_roles(
            user_skills
        )

        best_match = career_data["best_match"]

        # Generate skill gap recommendations
        recommendations = []

        if best_match:

            recommendations = generate_skill_gap_report(
                best_match
            )

        return Response(
            {
                "resume_id": resume.id,

                "career_analysis": career_data,

                "skill_gap_recommendations":
                    recommendations,
            },
            status=status.HTTP_200_OK
        )


class PowerBICareerDataView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        try:

            resume = Resume.objects.get(
                user=request.user,
                is_active=True
            )

            analysis = resume.analysis

        except Resume.DoesNotExist:

            return Response(
                {
                    "error": "No active analyzed resume found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        career_data = analyze_all_roles(
            analysis.skills
        )

        powerbi_data = prepare_powerbi_career_data(
            career_data
        )

        return Response({
            "resume_id": resume.id,
            "data": powerbi_data
        })