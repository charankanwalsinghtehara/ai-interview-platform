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


# ==========================================
# START INTERVIEW
# ==========================================

class StartInterviewView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request):

        role = request.data.get("role")


        if not role:

            return Response(
                {
                    "error": "Please provide a role."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # ==========================================
        # GET USER'S ACTIVE RESUME
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
        # GET EXTRACTED SKILLS
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


        serializer = InterviewSerializer(interview)


        return Response(
            {
                "message":
                    "Personalized interview started successfully",

                "user_skills":
                    user_skills,

                "interview":
                    serializer.data,

            },
            status=status.HTTP_201_CREATED
        )


# ==========================================
# SUBMIT ANSWER
# ==========================================

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


        # ==========================================
        # GET QUESTION
        # ==========================================

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


        # ==========================================
        # PREVENT MULTIPLE ANSWERS
        # ==========================================

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


        # ==========================================
        # SAVE ANSWER
        # ==========================================

        answer = InterviewAnswer.objects.create(

            question=question,

            answer_text=answer_text

        )


        return Response(
            {
                "message":
                    "Answer submitted successfully",

                "answer_id":
                    answer.id,

            },
            status=status.HTTP_201_CREATED
        )


# ==========================================
# COMPLETE INTERVIEW
# ==========================================

class CompleteInterviewView(APIView):

    permission_classes = [IsAuthenticated]


    def post(self, request, interview_id):

        # ==========================================
        # GET INTERVIEW
        # ==========================================

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


        # ==========================================
        # CHECK IF ALREADY COMPLETED
        # ==========================================

        if interview.status == "completed":

            return Response(
                {
                    "error":
                        "Interview is already completed."
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
        # IMPORT EVALUATION SERVICES
        # ==========================================

        from apps.evaluation.services.answer_evaluator import (
            evaluate_answer
        )


        from apps.evaluation.models import (
            AnswerEvaluation
        )


        # ==========================================
        # GET ALL ANSWERS
        # ==========================================

        answers = InterviewAnswer.objects.filter(

            question__interview=interview

        ).select_related(
            "question"
        )


        # ==========================================
        # AUTOMATICALLY EVALUATE ALL ANSWERS
        # ==========================================

        for answer in answers:

            question = answer.question


            result = evaluate_answer(

                answer_text=answer.answer_text,

                skill=question.skill,

                category=question.category

            )


            AnswerEvaluation.objects.update_or_create(

                answer=answer,

                defaults={

                    "word_count":
                        result["word_count"],

                    "length_score":
                        result["length_score"],

                    "keyword_score":
                        result["keyword_score"],

                    "final_score":
                        result["final_score"],

                }

            )


        # ==========================================
        # COMPLETE INTERVIEW
        # ==========================================

        interview.status = "completed"

        interview.completed_at = timezone.now()

        interview.save()


        # ==========================================
        # SUCCESS RESPONSE
        # ==========================================

        return Response(
            {
                "message":
                    "Interview completed and answers evaluated successfully",

                "interview_id":
                    interview.id,

                "status":
                    interview.status,

                "evaluated_answers":
                    answers.count(),

            },
            status=status.HTTP_200_OK
        )