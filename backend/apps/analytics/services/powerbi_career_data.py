def prepare_powerbi_career_data(career_data):

    data = []

    for role_result in career_data["role_analysis"]:

        data.append({
            "role": role_result["role"],
            "readiness_score":
                role_result["readiness_score"],
        })

    return data