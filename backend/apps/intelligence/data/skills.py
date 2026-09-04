SKILL_CATEGORIES = {
    "programming": [
        "python",
        "java",
        "javascript",
        "c++",
        "c",
        "r",
    ],

    "data_science": [
        "pandas",
        "numpy",
        "scikit-learn",
        "machine learning",
        "data science",
        "data analysis",
        "statistics",
        "tensorflow",
        "pytorch",
    ],

    "data_visualization": [
        "power bi",
        "tableau",
        "matplotlib",
        "seaborn",
        "excel",
    ],

    "databases": [
        "sql",
        "mysql",
        "postgresql",
        "sqlite",
        "mongodb",
    ],

    "backend": [
        "django",
        "django rest framework",
        "rest api",
        "fastapi",
    ],

    "frontend": [
        "react",
        "html",
        "css",
    ],

    "tools": [
        "git",
        "github",
        "docker",
        "jupyter",
        "vscode",
    ],

    "cloud": [
        "aws",
        "azure",
        "google cloud",
    ],
}


# Flat list for skill extraction
SKILLS = []

for category_skills in SKILL_CATEGORIES.values():
    SKILLS.extend(category_skills)