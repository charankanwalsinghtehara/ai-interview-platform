import re


def evaluate_answer(answer_text, skill, category):

    # ==========================================
    # EMPTY ANSWER
    # ==========================================

    if not answer_text or not answer_text.strip():

        return {
            "word_count": 0,
            "length_score": 0,
            "keyword_score": 0,
            "quality_score": 0,
            "final_score": 0,
            "matched_keywords": [],
            "skill": skill,
            "category": category,
        }


    # ==========================================
    # CLEAN ANSWER
    # ==========================================

    answer_text = answer_text.strip()

    answer_lower = answer_text.lower()


    words = re.findall(
        r"\b[\w'-]+\b",
        answer_lower
    )


    word_count = len(words)


    # ==========================================
    # LENGTH SCORE
    # ==========================================

    if word_count < 3:

        length_score = 10


    elif word_count < 8:

        length_score = 35


    elif word_count < 15:

        length_score = 55


    elif word_count < 30:

        length_score = 75


    elif word_count < 60:

        length_score = 90


    else:

        length_score = 100


    # ==========================================
    # SKILL KEYWORDS
    # ==========================================

    keyword_map = {

        "python": [

            "python",
            "list",
            "tuple",
            "dictionary",
            "dict",
            "function",
            "class",
            "module",
            "library",
            "package",
            "object",
        ],


        "pandas": [

            "pandas",
            "dataframe",
            "series",
            "data",
            "cleaning",
            "analysis",
            "csv",
            "excel",
            "missing values",
            "groupby",
        ],


        "numpy": [

            "numpy",
            "array",
            "arrays",
            "numerical",
            "matrix",
            "calculation",
            "computation",
        ],


        "sql": [

            "sql",
            "select",
            "from",
            "where",
            "join",
            "table",
            "database",
            "query",
            "insert",
            "update",
            "delete",
        ],


        "power bi": [

            "power bi",
            "dashboard",
            "visualization",
            "report",
            "data",
            "power query",
            "dax",
            "charts",
        ],


        "machine learning": [

            "machine learning",
            "model",
            "training",
            "prediction",
            "dataset",
            "features",
            "algorithm",
            "classification",
            "regression",
        ],


        "data analysis": [

            "data",
            "analysis",
            "cleaning",
            "visualization",
            "insights",
            "dataset",
            "patterns",
            "report",
        ],


        "business analysis": [

            "business",
            "requirements",
            "stakeholder",
            "process",
            "analysis",
            "documentation",
            "solution",
        ],


        "requirements": [

            "requirements",
            "functional",
            "non-functional",
            "stakeholder",
            "business",
            "documentation",
        ],


        "communication": [

            "communication",
            "team",
            "stakeholder",
            "clear",
            "requirements",
            "collaboration",
            "explain",
        ],


        "feature engineering": [

            "feature",
            "features",
            "data",
            "transformation",
            "selection",
            "model",
            "variables",
        ],


        "scikit-learn": [

            "scikit-learn",
            "sklearn",
            "machine learning",
            "model",
            "classification",
            "regression",
            "training",
        ],

    }


    # ==========================================
    # NORMALIZE SKILL
    # ==========================================

    skill_normalized = (
        skill.lower().strip()
        if skill
        else ""
    )


    keywords = keyword_map.get(
        skill_normalized,
        []
    )


    # ==========================================
    # KEYWORD MATCHING
    # ==========================================

    matched_keywords = []


    for keyword in keywords:

        if keyword in answer_lower:

            matched_keywords.append(keyword)


    # ==========================================
    # KEYWORD SCORE
    # ==========================================

    if keywords:

        match_percentage = (
            len(matched_keywords)
            /
            len(keywords)
        ) * 100


        keyword_score = round(
            min(
                match_percentage * 2.5,
                100
            ),
            2
        )


    else:

        # Unknown skill should not automatically
        # destroy the user's score

        keyword_score = 50


    # ==========================================
    # ANSWER QUALITY SCORE
    # ==========================================

    quality_score = 0


    # Reasonable answer length

    if word_count >= 10:

        quality_score += 30


    # Good explanation length

    if word_count >= 20:

        quality_score += 20


    # Contains multiple sentences

    sentence_count = len(
        re.findall(
            r"[.!?]+",
            answer_text
        )
    )


    if sentence_count >= 2:

        quality_score += 20


    # Explanation indicators

    explanation_words = [

        "because",

        "for example",

        "for instance",

        "used to",

        "helps",

        "allows",

        "means",

        "used for",

        "such as",

    ]


    explanation_matches = sum(

        1

        for phrase in explanation_words

        if phrase in answer_lower

    )


    quality_score += min(
        explanation_matches * 10,
        30
    )


    quality_score = min(
        quality_score,
        100
    )


    # ==========================================
    # FINAL SCORE
    # ==========================================

    final_score = round(

        (
            length_score * 0.25
        )

        +

        (
            keyword_score * 0.40
        )

        +

        (
            quality_score * 0.35
        ),

        2

    )


    # Prevent a reasonable detailed answer
    # from receiving an extremely low score

    if word_count >= 20 and final_score < 40:

        final_score = 40


    if word_count >= 40 and final_score < 55:

        final_score = 55


    return {

        "word_count":
            word_count,

        "length_score":
            length_score,

        "keyword_score":
            keyword_score,

        "quality_score":
            quality_score,

        "matched_keywords":
            matched_keywords,

        "final_score":
            final_score,

        "skill":
            skill_normalized,

        "category":
            category,

    }