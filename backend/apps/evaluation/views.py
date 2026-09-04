from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.interviews.models import InterviewAnswer

from .models import AnswerEvaluation

from .services.answer_evaluator import (
    evaluate_answer
)
from apps.interviews.models import Interview

from .services.interview_report import (
    generate_interview_report
)


class EvaluateAnswerView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, answer_id):

        try:

            answer = InterviewAnswer.objects.get(
                id=answer_id,
                question__interview__user=request.user
            )

        except InterviewAnswer.DoesNotExist:

            return Response(
                {
                    "error": "Answer not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        question = answer.question

        # Evaluate answer
        result = evaluate_answer(
            answer_text=answer.answer_text,
            skill=question.skill,
            category=question.category
        )

        # Save or update evaluation
        evaluation, created = (
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
        )

        return Response(
            {
                "message":
                    "Answer evaluated successfully",

                "answer_id": answer.id,

                "question": question.question_text,

                "skill": question.skill,

                "evaluation": {
                    "word_count":
                        evaluation.word_count,

                    "length_score":
                        evaluation.length_score,

                    "keyword_score":
                        evaluation.keyword_score,

                    "final_score":
                        evaluation.final_score,
                }
            },
            status=status.HTTP_200_OK
        )

class GenerateInterviewReportView(APIView):

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

        # Make sure interview is completed
        if interview.status != "completed":

            return Response(
                {
                    "error": (
                        "Please complete the interview "
                        "before generating the report."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate report
        result = generate_interview_report(
            interview
        )

        return Response(
            {
                "message":
                    "Interview report generated successfully",

                "interview_id": interview.id,

                "overall_score":
                    result["overall_score"],

                "performance_level":
                    result["performance_level"],

                "total_questions":
                    result["total_questions"],

                "evaluated_answers":
                    result["evaluated_answers"],

                "skill_scores":
                    result["skill_scores"],

                "category_scores":
                    result["category_scores"],
            },
            status=status.HTTP_200_OK
        )