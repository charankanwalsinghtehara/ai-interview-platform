from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .services.recommender import (
    get_job_recommendations
)


class JobRecommendationView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        recommendations = get_job_recommendations(
            request.user
        )

        results = []

        for item in recommendations:

            job = item["job"]

            results.append(
                {
                    "id": job.id,

                    "title": job.title,

                    "company": job.company,

                    "location": job.location,

                    "job_type": job.job_type,

                    "experience_level":
                        job.experience_level,

                    "required_skills":
                        job.required_skills,

                    "application_url":
                        job.application_url,

                    "resume_similarity":
                        item["similarity_score"],

                    "interview_score":
                        item["interview_score"],

                    "candidate_score":
                        item["candidate_score"],

                    "match_score":
                        item["match_score"],

                    "matched_skills":
    item["matched_skills"],

"missing_skills":
    item["missing_skills"],
                }
            )

        return Response(
            {
                "total_recommendations":
                    len(results),

                "recommendations":
                    results
            }
        )