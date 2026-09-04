import re

from apps.intelligence.data.skills import SKILLS


def extract_skills(text):
    """
    Extract known skills from resume text.
    """

    found_skills = []

    text = text.lower()

    for skill in SKILLS:

        pattern = r"(?<!\w)" + re.escape(skill.lower()) + r"(?!\w)"

        if re.search(pattern, text):
            found_skills.append(skill)

    return sorted(set(found_skills))