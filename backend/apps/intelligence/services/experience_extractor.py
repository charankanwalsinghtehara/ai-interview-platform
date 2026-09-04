import re


def extract_experience(text):
    """
    Try to detect years/months of experience.
    """

    patterns = [
        r"(\d+)\+?\s*years?\s*(?:of)?\s*experience",
        r"(\d+)\+?\s*yrs?\s*(?:of)?\s*experience",
        r"(\d+)\s*months?\s*(?:of)?\s*experience",
    ]

    results = []

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text.lower()
        )

        for match in matches:
            results.append(match)

    return results