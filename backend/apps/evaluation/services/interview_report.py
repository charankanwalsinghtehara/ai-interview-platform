from collections import defaultdict

from apps.interviews.models import InterviewAnswer

from apps.evaluation.models import (
    AnswerEvaluation,
    InterviewReport
)

def get_performance_level(score):

    if score >= 85:
        return "Excellent"

    elif score >= 70:
        return "Good"

    elif score >= 50:
        return "Average"

    else:
        return "Needs Improvement"


def generate_interview_report(interview):

    # Get all answers for this interview
    answers = InterviewAnswer.objects.filter(
        question__interview=interview
    )

    total_questions = interview.questions.count()

    skill_scores = defaultdict(list)

    category_scores = defaultdict(list)

    evaluated_answers = 0

    all_scores = []

    for answer in answers:

        try:

            evaluation = answer.evaluation

        except AnswerEvaluation.DoesNotExist:

            continue

        score = evaluation.final_score

        evaluated_answers += 1

        all_scores.append(score)

        # Skill-wise grouping
        skill = answer.question.skill

        if skill:

            skill_scores[skill].append(score)

        # Category-wise grouping
        category = answer.question.category

        if category:

            category_scores[category].append(score)

    # -------------------------
    # SKILL-WISE AVERAGES
    # -------------------------

    skill_report = {}

    for skill, scores in skill_scores.items():

        skill_report[skill] = round(
            sum(scores) / len(scores),
            2
        )

    # -------------------------
    # CATEGORY-WISE AVERAGES
    # -------------------------

    category_report = {}

    for category, scores in category_scores.items():

        category_report[category] = round(
            sum(scores) / len(scores),
            2
        )

    # -------------------------
    # OVERALL SCORE
    # -------------------------

    if all_scores:

        overall_score = round(
            sum(all_scores) / len(all_scores),
            2
        )

    else:

        overall_score = 0

    performance_level = get_performance_level(
        overall_score
    )

    # -------------------------
    # SAVE REPORT
    # -------------------------

    report, created = (
        InterviewReport.objects.update_or_create(
            interview=interview,

            defaults={
                "overall_score": overall_score,

                "performance_level":
                    performance_level,

                "total_questions":
                    total_questions,

                "evaluated_answers":
                    evaluated_answers,
            }
        )
    )

    return {
        "report": report,

        "skill_scores": skill_report,

        "category_scores": category_report,

        "overall_score": overall_score,

        "performance_level": performance_level,

        "total_questions": total_questions,

        "evaluated_answers": evaluated_answers,
    }