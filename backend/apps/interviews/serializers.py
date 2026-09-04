from rest_framework import serializers

from .models import (
    Interview,
    InterviewQuestion,
    InterviewAnswer,
)


class InterviewQuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = InterviewQuestion

        fields = [
            "id",
            "question_text",
            "question_order",
            "category",
            "skill",
            "difficulty",
        ]


class InterviewSerializer(serializers.ModelSerializer):

    questions = InterviewQuestionSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Interview

        fields = [
            "id",
            "role",
            "status",
            "started_at",
            "completed_at",
            "questions",
        ]


class InterviewAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = InterviewAnswer

        fields = [
            "id",
            "question",
            "answer_text",
            "answered_at",
        ]

        read_only_fields = [
            "id",
            "answered_at",
        ]