import re


def evaluate_answer(answer_text, skill, category):

    if not answer_text:
        return {
            "word_count": 0,
            "length_score": 0,
            "keyword_score": 0,
            "final_score": 0,
        }

    # Clean and split words
    words = re.findall(
        r"\b\w+\b",
        answer_text.lower()
    )

    word_count = len(words)

    # -------------------------
    # LENGTH SCORE
    # -------------------------

    if word_count < 5:
        length_score = 10

    elif word_count < 15:
        length_score = 30

    elif word_count < 30:
        length_score = 60

    elif word_count < 60:
        length_score = 85

    else:
        length_score = 100

    # -------------------------
    # KEYWORD ANALYSIS
    # -------------------------

    keyword_map = {

        "python": [
            "python",
            "list",
            "tuple",
            "dictionary",
            "function",
            "library",
        ],

        "pandas": [
            "pandas",
            "dataframe",
            "data",
            "cleaning",
            "analysis",
        ],

        "numpy": [
            "numpy",
            "array",
            "numerical",
            "matrix",
        ],

        "sql": [
            "sql",
            "select",
            "join",
            "table",
            "database",
            "query",
        ],

        "power bi": [
            "power bi",
            "dashboard",
            "visualization",
            "report",
            "data",
        ],

        "machine learning": [
            "machine learning",
            "model",
            "training",
            "prediction",
            "data",
        ],

        "data analysis": [
            "data",
            "analysis",
            "cleaning",
            "visualization",
            "insights",
        ],

        "business analysis": [
            "business",
            "requirements",
            "stakeholder",
            "process",
            "analysis",
        ],

        "requirements": [
            "requirements",
            "functional",
            "non-functional",
            "stakeholder",
        ],

        "communication": [
            "communication",
            "team",
            "stakeholder",
            "clear",
            "requirements",
        ],

        "feature engineering": [
            "feature",
            "data",
            "transformation",
            "selection",
            "model",
        ],

        "scikit-learn": [
            "scikit-learn",
            "machine learning",
            "model",
            "classification",
            "regression",
        ],
    }

    skill = skill.lower().strip()

    keywords = keyword_map.get(skill, [])

    answer_lower = answer_text.lower()

    matched_keywords = []

    for keyword in keywords:

        if keyword in answer_lower:
            matched_keywords.append(keyword)

    if keywords:

        keyword_score = round(
            (len(matched_keywords) / len(keywords)) * 100,
            2
        )

    else:
        keyword_score = 0

    # -------------------------
    # FINAL SCORE
    # -------------------------

    final_score = round(
        (length_score * 0.40)
        +
        (keyword_score * 0.60),
        2
    )

    return {
        "word_count": word_count,

        "length_score": length_score,

        "keyword_score": keyword_score,

        "matched_keywords": matched_keywords,

        "final_score": final_score,

        "skill": skill,

        "category": category,
    }