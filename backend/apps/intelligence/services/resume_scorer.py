def calculate_resume_scores(
    categorized_skills,
    education,
    experience,
    projects
):

    # ---------------------------
    # SKILLS SCORE
    # ---------------------------

    total_skills = sum(
        len(skills)
        for skills in categorized_skills.values()
    )

    skills_score = min(total_skills * 8, 100)

    # ---------------------------
    # EDUCATION SCORE
    # ---------------------------

    education_score = 0

    if education:
        education_score = 80

        advanced_degrees = [
            "master",
            "m.tech",
            "mtech",
            "mba",
            "phd",
        ]

        if any(
            degree in education
            for degree in advanced_degrees
        ):
            education_score = 100

    # ---------------------------
    # PROJECT SCORE
    # ---------------------------

    project_count = len(projects)

    project_score = min(
        project_count * 20,
        100
    )

    # ---------------------------
    # EXPERIENCE SCORE
    # ---------------------------

    experience_score = 0

    if experience:

        total_experience = 0

        for exp in experience:
            try:
                total_experience += int(exp)
            except ValueError:
                continue

        experience_score = min(
            total_experience * 15,
            100
        )

    # ---------------------------
    # CATEGORY SCORE
    # ---------------------------

    category_scores = {}

    for category, skills in categorized_skills.items():

        category_scores[category] = min(
            len(skills) * 20,
            100
        )

    # ---------------------------
    # OVERALL SCORE
    # ---------------------------

    overall_score = round(
        (
            skills_score * 0.40
            + education_score * 0.15
            + project_score * 0.25
            + experience_score * 0.20
        ),
        2
    )

    return {
        "skills_score": skills_score,
        "education_score": education_score,
        "project_score": project_score,
        "experience_score": experience_score,
        "category_scores": category_scores,
        "overall_resume_score": overall_score,
    }