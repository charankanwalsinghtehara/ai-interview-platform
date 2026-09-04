from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .services.candidate_report import (
    generate_candidate_report
)
from apps.evaluation.models import InterviewReport
from apps.intelligence.models import ResumeAnalysis
from apps.reports.models import CandidateReport

class GenerateCandidateReportView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        report = generate_candidate_report(
            request.user
        )

        return Response(
            {
                "message":
                    "Candidate report generated successfully",

                "report": {
                    "resume_score":
                        report.resume_score,

                    "skill_score":
                        report.skill_score,

                    "career_score":
                        report.career_score,

                    "interview_score":
                        report.interview_score,

                    "final_score":
                        report.final_score,

                    "candidate_level":
                        report.candidate_level,

                    "recommended_role":
                        report.recommended_role,
                }
            }
        )

