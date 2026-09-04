from apps.analytics.data.roles import ROLE_REQUIREMENTS
from .role_matcher import analyze_role_match


def analyze_all_roles(user_skills):

    role_results = []

    for role_name in ROLE_REQUIREMENTS:

        result = analyze_role_match(
            user_skills,
            role_name
        )

        role_results.append(result)

    # Highest readiness first
    role_results.sort(
        key=lambda x: x["readiness_score"],
        reverse=True
    )

    best_match = None

    if role_results:
        best_match = role_results[0]

    return {
        "best_match": best_match,
        "role_analysis": role_results,
    }