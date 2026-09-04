from apps.analytics.data.roles import ROLE_REQUIREMENTS


def analyze_role_match(user_skills, role_name):

    role = ROLE_REQUIREMENTS.get(role_name)

    if not role:
        return None

    user_skills = {
        skill.lower()
        for skill in user_skills
    }

    required_skills = {
        skill.lower()
        for skill in role["required_skills"]
    }

    important_skills = {
        skill.lower()
        for skill in role["important_skills"]
    }

    # Required skill matching
    matched_required = sorted(
        user_skills.intersection(required_skills)
    )

    missing_required = sorted(
        required_skills.difference(user_skills)
    )

    # Important skill matching
    matched_important = sorted(
        user_skills.intersection(important_skills)
    )

    missing_important = sorted(
        important_skills.difference(user_skills)
    )

    # --------------------------------
    # READINESS CALCULATION
    # --------------------------------

    required_weight = 0.75
    important_weight = 0.25

    required_score = 0

    if required_skills:
        required_score = (
            len(matched_required)
            / len(required_skills)
        ) * 100

    important_score = 0

    if important_skills:
        important_score = (
            len(matched_important)
            / len(important_skills)
        ) * 100

    readiness_score = round(
        (
            required_score * required_weight
            + important_score * important_weight
        ),
        2
    )

    return {
        "role": role_name,

        "readiness_score": readiness_score,

        "matched_required_skills": matched_required,
        "missing_required_skills": missing_required,

        "matched_important_skills": matched_important,
        "missing_important_skills": missing_important,

        "total_matched_skills": (
            len(matched_required)
            + len(matched_important)
        ),

        "total_missing_skills": (
            len(missing_required)
            + len(missing_important)
        ),
    }