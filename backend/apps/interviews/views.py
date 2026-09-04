from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone

from .models import (
    Interview,
    InterviewQuestion,
    InterviewAnswer,
)

from .serializers import InterviewSerializer

from apps.resumes.models import Resume

from .services.question_selector import (
    select_personalized_questions
)

from apps.payments.services.subscription_service import (
    can_use_feature,
    record_feature_usage
)


# ==================================================
# START INTERVIEW
# ==================================================

class StartInterviewView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request):

        # ==========================================
        # CHECK SUBSCRIPTION LIMIT
        # ==========================================

        if not can_use_feature(
            request.user,
            "INTERVIEW",
            "interviews"
        ):

            return Response(
                {
                    "error": (
                        "You have reached your monthly interview "
                        "limit. Please upgrade your subscription."
                    )
                },
                status=status.HTTP_403_FORBIDDEN
            )


        role = request.data.get("role")


        if not role:

            return Response(
                {
                    "error": "Please provide a role."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==========================================
        # GET ACTIVE RESUME
        # ==========================================

        try:

            resume = Resume.objects.get(
                user=request.user,
                is_active=True
            )

            analysis = resume.analysis


        except Resume.DoesNotExist:

            return Response(
                {
                    "error": (
                        "Please upload and analyze "
                        "your resume first."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        except Exception:

            return Response(
                {
                    "error": (
                        "Resume analysis not found. "
                        "Please analyze your resume first."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==========================================
        # GET USER SKILLS
        # ==========================================

        user_skills = analysis.skills


        # ==========================================
        # SELECT PERSONALIZED QUESTIONS
        # ==========================================

        questions = select_personalized_questions(
            role=role,
            user_skills=user_skills,
            number_of_questions=5
        )


        if not questions:

            return Response(
                {
                    "error": "Invalid role selected."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==========================================
        # CREATE INTERVIEW
        # ==========================================

        interview = Interview.objects.create(
            user=request.user,
            role=role
        )


        # ==========================================
        # CREATE QUESTIONS
        # ==========================================

        for index, question_data in enumerate(
            questions,
            start=1
        ):

            InterviewQuestion.objects.create(
                interview=interview,
                question_text=question_data["question"],
                question_order=index,
                category=question_data["category"],
                skill=question_data["skill"],
                difficulty=question_data["difficulty"],
            )


        # ==========================================
        # RECORD INTERVIEW USAGE
        # Only after successfully creating interview
        # ==========================================

        record_feature_usage(
            request.user,
            "INTERVIEW"
        )


        serializer = InterviewSerializer(interview)


        return Response(
            {
                "message":
                    "Personalized interview started successfully",

                "user_skills": user_skills,

                "interview": serializer.data,
            },
            status=status.HTTP_201_CREATED
        )


# ==================================================
# SUBMIT ANSWER
# ==================================================

class SubmitAnswerView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request, question_id):

        answer_text = request.data.get(
            "answer_text"
        )


        if not answer_text:

            return Response(
                {
                    "error": "Answer cannot be empty."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        try:

            question = InterviewQuestion.objects.get(
                id=question_id,
                interview__user=request.user
            )


        except InterviewQuestion.DoesNotExist:

            return Response(
                {
                    "error": "Question not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )


        # Prevent multiple answers

        if hasattr(question, "answer"):

            return Response(
                {
                    "error": (
                        "Answer already submitted "
                        "for this question."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        answer = InterviewAnswer.objects.create(
            question=question,
            answer_text=answer_text
        )


        return Response(
            {
                "message": "Answer submitted successfully",
                "answer_id": answer.id,
            },
            status=status.HTTP_201_CREATED
        )


# ==================================================
# COMPLETE INTERVIEW
# ==================================================

class CompleteInterviewView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request, interview_id):

        try:

            interview = Interview.objects.get(
                id=interview_id,
                user=request.user
            )


        except Interview.DoesNotExist:

            return Response(
                {
                    "error": "Interview not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )


        if interview.status == "completed":

            return Response(
                {
                    "error": "Interview is already completed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==========================================
        # CHECK UNANSWERED QUESTIONS
        # ==========================================

        unanswered_questions = interview.questions.filter(
            answer__isnull=True
        )


        if unanswered_questions.exists():

            return Response(
                {
                    "error": (
                        "Please answer all questions "
                        "before completing the interview."
                    ),

                    "unanswered_questions": list(
                        unanswered_questions.values_list(
                            "id",
                            flat=True
                        )
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==========================================
        # COMPLETE INTERVIEW
        # ==========================================

        interview.status = "completed"

        interview.completed_at = timezone.now()

        interview.save()


        return Response(
            {
                "message": "Interview completed successfully",

                "interview_id": interview.id,

                "status": interview.status,
            }
        )