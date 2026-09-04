def prepare_powerbi_data(analysis):

    data = []

    # Category-wise data
    for category, score in analysis.category_scores.items():

        data.append({
            "category": category,
            "score": score,
            "resume_id": analysis.resume.id,
        })

    return data