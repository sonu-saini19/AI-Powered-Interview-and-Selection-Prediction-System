import { useState } from "react";
import Result from "./pages/Results";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [role, setRole] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [scores, setScores] = useState([]);
  const [feedback, setFeedback] = useState("");
  if (showResult) {
    return <Result feedback={feedback} />;
  }

  const roles = [
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "AI Engineer",
    "Software Engineer",
  ];

  const startInterview = async () => {
    if (!role) return;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/start-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role,
        }),
      });

      const data = await response.json();
      setQuestion(data.question);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const submitAnswer = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/submit-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        answer: answer,
        job_role: role,
      }),
    });

    const data = await response.json();

    // Evaluation score save karo
    setScores((prev) => [...prev, data]);

    // 10 questions complete
    if (currentQuestion === 10) {
      console.log("Interview Completed");

      const allScores = [...scores, data];
      console.log("All Scores:", allScores);

      try {
        const feedbackResponse = await fetch(
          "http://127.0.0.1:8000/feedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              scores: allScores,
            }),
          }
        );

        const feedbackData = await feedbackResponse.json();

        setFeedback(feedbackData.feedback);
        console.log("AI Feedback:", feedbackData.feedback);
      } catch (error) {
        console.error("Feedback Error:", error);
      }

      setShowResult(true);
      return;
    }

    // Next question
    setCurrentQuestion((prev) => prev + 1);
    setAnswer("");

    // Next question generate karo
    const nextResponse = await fetch(
      "http://127.0.0.1:8000/start-interview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: role,
        }),
      }
    );

    const nextData = await nextResponse.json();
    setQuestion(nextData.question);

  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          InterviewIQ
        </h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="">Select Job Role</option>

          {roles.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={startInterview}
          disabled={!role || loading}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {loading ? "Starting..." : "Start Interview"}
        </button>

        {question && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold mb-2">
              Question {currentQuestion} / 10
            </h2>

            <p className="mb-4">{question}</p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full border p-3 rounded-lg mb-4"
              rows="5"
            />

            <button
              onClick={submitAnswer}
              disabled={!answer}
              className="w-full bg-black text-white p-3 rounded-lg"
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;