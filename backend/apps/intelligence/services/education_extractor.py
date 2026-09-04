import re


EDUCATION_KEYWORDS = [
    "b.tech",
    "btech",
    "bachelor of technology",
    "b.e",
    "bachelor of engineering",
    "bachelor",
    "master",
    "m.tech",
    "mtech",
    "mba",
    "phd",
    "diploma",
]


def extract_education(text):

    found_education = []

    text_lower = text.lower()

    for education in EDUCATION_KEYWORDS:

        if education in text_lower:
            found_education.append(education)

    return sorted(set(found_education))