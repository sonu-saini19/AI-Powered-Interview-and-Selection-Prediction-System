from fastapi import FastAPI
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = FastAPI()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


@app.get("/")
def home():
    return {"message": "InterviewIQ Backend Running"}


@app.get("/test-gemini")
def test_gemini():
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="Say hello in one sentence."
    )

    return {"response": response.text}

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InterviewRequest(BaseModel):
    role: str


@app.post("/start-interview")
def start_interview(data: InterviewRequest):

    prompt = f"""
    You are an AI interviewer.

    Conduct a professional interview for the role of {data.role}.

    Generate the first interview question.
    Ask only one question.
    Do not provide the answer.
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return {
        "question": response.text
    }

from pydantic import BaseModel

class AnswerRequest(BaseModel):
    question: str
    answer: str
    job_role: str


@app.post("/submit-answer")
def submit_answer(data: AnswerRequest):

    prompt = f"""
You are an AI interviewer.

Evaluate the candidate's answer honestly and strictly.

Question:
{data.question}

Candidate Answer:
{data.answer}

Give scores from 0 to 10 for:

- technical
- communication
- clarity
- problem_solving

Important:
- If the answer is very short, vague, irrelevant, or only says things like "ok", "yes", "no", give very low scores.
- Do not assume the candidate gave a good answer.
- Judge only the actual answer provided.
- Calculate overall as the average of the four scores.

Return ONLY valid JSON in this exact format:

{{
    "technical": 0,
    "communication": 0,
    "clarity": 0,
    "problem_solving": 0,
    "overall": 0
}}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    result = response.text.strip()

    result = re.sub(r"```json|```", "", result).strip()

    return json.loads(result)

from pydantic import BaseModel
import json
import re

class EvaluationRequest(BaseModel):
    question: str
    answer: str


@app.post("/evaluate")
def evaluate_answer(data: EvaluationRequest):

    prompt = f"""
You are an AI interviewer.

Evaluate the candidate's answer based on the interview question.

Question:
{data.question}

Candidate Answer:
{data.answer}

Give scores from 0 to 10 for:
- technical
- communication
- clarity
- problem_solving

Calculate overall as the average of these four scores.

Return ONLY valid JSON in this exact format:
{{
    "technical": 0,
    "communication": 0,
    "clarity": 0,
    "problem_solving": 0,
    "overall": 0
}}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    result = response.text.strip()

    result = re.sub(r"```json|```", "", result).strip()

    return json.loads(result)

def calculate_analytics(scores):
    technical = [s["technical"] for s in scores]
    communication = [s["communication"] for s in scores]
    clarity = [s["clarity"] for s in scores]
    problem_solving = [s["problem_solving"] for s in scores]

    analytics = {
        "technical_avg": round(sum(technical) / len(technical), 2),
        "communication_avg": round(sum(communication) / len(communication), 2),
        "clarity_avg": round(sum(clarity) / len(clarity), 2),
        "problem_solving_avg": round(sum(problem_solving) / len(problem_solving), 2)
    }

    analytics["overall_score"] = round(
        (
            analytics["technical_avg"]
            + analytics["communication_avg"]
            + analytics["clarity_avg"]
            + analytics["problem_solving_avg"]
        ) / 4,
        2
    )

    analytics["performance_percentage"] = round(
        analytics["overall_score"] * 10, 2
    )

    analytics["strongest_area"] = max(
        analytics,
        key=lambda x: analytics[x] if x.endswith("_avg") else -1
    )

    analytics["weakest_area"] = min(
        analytics,
        key=lambda x: analytics[x] if x.endswith("_avg") else 999
    )

    return analytics
class AnalyticsRequest(BaseModel):
    scores: list[dict]

@app.post("/analytics")
def get_analytics(data: AnalyticsRequest):
    analytics = calculate_analytics(data.scores)

    return analytics

from pydantic import BaseModel

class InterviewResult(BaseModel):
    technical: float
    communication: float
    clarity: float
    problem_solving: float
    selection_probability: float


@app.post("/final-result")
def final_result(data: InterviewResult):
    overall = (
        data.technical
        + data.communication
        + data.clarity
        + data.problem_solving
    ) / 4

    return {
        "technical": data.technical,
        "communication": data.communication,
        "clarity": data.clarity,
        "problem_solving": data.problem_solving,
        "overall": round(overall, 2),
        "selection_probability": data.selection_probability
    }

@app.post("/feedback")
def generate_feedback(data: dict):
    prompt = f"""
    Based on the following interview performance:

    Overall Score: {data.get("overall")}
    Technical Score: {data.get("technical")}
    Communication Score: {data.get("communication")}
    Clarity Score: {data.get("clarity")}
    Problem Solving Score: {data.get("problem_solving")}

    Generate:
    1. Overall Feedback
    2. Strengths
    3. Weak Areas
    4. Improvement Suggestions
    5. Topics to Improve

    Keep the feedback concise and professional.
    """

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return {
        "feedback": response.text
    }