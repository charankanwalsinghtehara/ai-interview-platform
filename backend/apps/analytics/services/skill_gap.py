def generate_skill_gap_report(role_result):

    missing_required = role_result[
        "missing_required_skills"
    ]

    missing_important = role_result[
        "missing_important_skills"
    ]

    recommendations = []

    for skill in missing_required:

        recommendations.append({
            "skill": skill,
            "priority": "High",
            "reason": (
                "This is a required skill for the target role."
            ),
        })

    for skill in missing_important:

        recommendations.append({
            "skill": skill,
            "priority": "Medium",
            "reason": (
                "This skill can improve your role readiness."
            ),
        })

    return recommendations