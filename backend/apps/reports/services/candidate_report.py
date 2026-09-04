from apps.evaluation.models import InterviewReport
from apps.intelligence.models import ResumeAnalysis
from apps.reports.models import CandidateReport


def get_candidate_level(score):

    if score >= 85:
        return "Excellent"

    elif score >= 70:
        return "Good"

    elif score >= 50:
        return "Average"

    return "Needs Improvement"


def calculate_final_score(
    resume_score,
    skill_score,
    career_score,
    interview_score
):

    final_score = (
        (resume_score * 0.30)
        +
        (skill_score * 0.25)
        +
        (career_score * 0.20)
        +
        (interview_score * 0.25)
    )

    return round(final_score, 2)


def get_latest_resume_analysis(user):

    analysis = (
        ResumeAnalysis.objects
        .filter(resume__user=user)
        .order_by("-analyzed_at")
        .first()
    )

    return analysis


def get_resume_score(user):

    analysis = get_latest_resume_analysis(user)

    if analysis:

        return analysis.overall_resume_score

    return 0


def get_skill_score(user):

    analysis = get_latest_resume_analysis(user)

    if analysis:

        return analysis.skills_score

    return 0


def get_career_score(user):

    analysis = get_latest_resume_analysis(user)

    if not analysis:

        return 0

    career_score = (
        analysis.education_score
        +
        analysis.project_score
        +
        analysis.experience_score
    ) / 3

    return round(career_score, 2)


def get_interview_score(user):

    latest_report = (
        InterviewReport.objects
        .filter(
            interview__user=user
        )
        .order_by("-updated_at")
        .first()
    )

    if latest_report:

        return latest_report.overall_score

    return 0


def generate_candidate_report(user):

    resume_score = get_resume_score(user)

    skill_score = get_skill_score(user)

    career_score = get_career_score(user)

    interview_score = get_interview_score(user)

    final_score = calculate_final_score(
        resume_score,
        skill_score,
        career_score,
        interview_score
    )

    candidate_level = get_candidate_level(
        final_score
    )

    report, created = (
        CandidateReport.objects.update_or_create(
            user=user,

            defaults={
                "resume_score": resume_score,
                "skill_score": skill_score,
                "career_score": career_score,
                "interview_score": interview_score,
                "final_score": final_score,
                "candidate_level": candidate_level,
            }
        )
    )

    return report