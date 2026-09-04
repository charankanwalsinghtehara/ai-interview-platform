from apps.intelligence.data.skills import SKILL_CATEGORIES


def categorize_skills(skills):

    categorized = {}

    for category, category_skills in SKILL_CATEGORIES.items():

        found_skills = [
            skill
            for skill in skills
            if skill.lower() in category_skills
        ]

        categorized[category] = found_skills

    return categorized