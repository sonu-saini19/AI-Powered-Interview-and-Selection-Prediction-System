# InterviewIQ — AI-Powered Interview & Selection Prediction System

InterviewIQ is an AI-powered mock interview platform designed to simulate a structured interview experience based on the user's selected job role and difficulty level.

The application generates role-specific interview questions, evaluates each answer, analyzes performance across multiple skill areas, predicts selection probability using a machine learning model, and provides personalized feedback with improvement suggestions.

## Features

* Job role selection
* Difficulty level selection
* AI-generated interview questions
* Multi-question interview flow
* AI-based answer evaluation
* Technical knowledge scoring
* Communication scoring
* Clarity scoring
* Problem-solving scoring
* Overall performance score
* Machine learning-based selection prediction
* Selection probability percentage
* Performance analytics and insights
* Strength and weakness identification
* Visual performance dashboard
* AI-generated detailed feedback
* Personalized improvement suggestions
* Error handling and validation
* Fully deployed web application

## How It Works

```text
Select Job Role
      ↓
Select Difficulty
      ↓
Start Interview
      ↓
AI Generates Questions
      ↓
User Submits Answers
      ↓
AI Evaluates Each Answer
      ↓
Skill-wise Scores Generated
      ↓
Data Analysis & Performance Calculation
      ↓
ML Model Predicts Selection Probability
      ↓
Performance Dashboard
      ↓
Feedback & Improvement Suggestions
```

## Performance Evaluation

Each answer is evaluated across the following areas:

* **Technical Knowledge**
* **Communication**
* **Clarity**
* **Problem Solving**

The individual scores are combined to generate an overall performance score and further used for analytics and selection prediction.

## Machine Learning Component

The project includes a machine learning component that uses interview performance metrics as input features to predict:

* Selection outcome
* Selection probability

The model analyzes the candidate's performance across different scoring categories and estimates their chances of selection based on those features.

## Data Analytics

InterviewIQ also includes a Data Science layer that analyzes the interview results to identify:

* Overall performance
* Category-wise performance
* Strongest skills
* Areas needing improvement
* Score patterns
* Key factors influencing the prediction

The results are presented through an interactive performance dashboard with visualizations.

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend

* Python
* FastAPI

### AI

* Google Gemini API

### Machine Learning & Data Science

* Scikit-learn
* Pandas
* NumPy

### Data Visualization

* Charts and performance visualizations

### Deployment

* Vercel — Frontend
* Render — Backend

## Project Structure

```text
InterviewIQ/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── model/
│   ├── .env
│   └── requirements.txt
│
└── README.md
```

## Installation and Setup

### Clone the repository

```bash
git clone https://github.com/sonu-saini19/AI-Powered-Interview-and-Selection-Prediction-System
cd InterviewIQ
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Key Highlights

Unlike a basic chatbot-based interview application, InterviewIQ combines:

* **Generative AI** for interview question generation and answer evaluation
* **Machine Learning** for selection prediction
* **Data Analysis** for performance insights
* **Data Visualization** for understanding interview performance

The project is designed to demonstrate how AI and Data Science can work together in a practical, end-to-end application.

## Future Improvements

* Resume-based personalized interviews
* Voice-based interview mode
* Interview history tracking
* Authentication and user profiles
* Additional job roles
* Advanced ML models
* Real-time follow-up questions

## Author

**Sonu Saini**

If you found this project interesting, feel free to explore the repository and share your feedback.
