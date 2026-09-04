def generate_analytics(analysis):

    category_scores = analysis.category_scores

    strengths = []
    weaknesses = []
    developing_areas = []

    for category, score in category_scores.items():

        if score >= 60:
            strengths.append(category)

        elif score < 40:
            weaknesses.append(category)

        else:
            developing_areas.append(category)

    total_skills = len(analysis.skills)
    total_projects = len(analysis.projects)

    resume_score = analysis.overall_resume_score

    if resume_score >= 80:
        readiness = "Excellent"

    elif resume_score >= 65:
        readiness = "Good"

    elif resume_score >= 45:
        readiness = "Developing"

    else:
        readiness = "Beginner"

    return {
        "resume_score": resume_score,
        "readiness": readiness,

        "total_skills": total_skills,
        "total_projects": total_projects,

        "strengths": strengths,
        "weaknesses": weaknesses,
        "developing_areas": developing_areas,

        "category_scores": category_scores,
    }