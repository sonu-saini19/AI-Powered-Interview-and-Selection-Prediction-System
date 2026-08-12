import React from "react";

function Result({ feedback }) {
  const scores = {
    technical: 82,
    communication: 75,
    clarity: 80,
    problem_solving: 78,
    overall: 78.75,
    selection_probability: 81,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Interview Performance
      </h1>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Technical Score</h2>
          <p className="text-3xl font-bold">{scores.technical}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Communication</h2>
          <p className="text-3xl font-bold">{scores.communication}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Clarity</h2>
          <p className="text-3xl font-bold">{scores.clarity}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Problem Solving</h2>
          <p className="text-3xl font-bold">{scores.problem_solving}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Overall Score</h2>
          <p className="text-3xl font-bold">{scores.overall}%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Selection Probability</h2>
          <p className="text-3xl font-bold">
            {scores.selection_probability}%
          </p>
        </div>

      </div>

      {/* Performance Analysis */}
      <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-6">
          Performance Analysis
        </h2>

        <div className="space-y-5">

          <div>
            <div className="flex justify-between mb-1">
              <span>Technical</span>
              <span>{scores.technical}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${scores.technical}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Communication</span>
              <span>{scores.communication}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${scores.communication}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Clarity</span>
              <span>{scores.clarity}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: `${scores.clarity}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Problem Solving</span>
              <span>{scores.problem_solving}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-purple-500 h-4 rounded-full"
                style={{ width: `${scores.problem_solving}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
      {/* Strengths & Weaknesses */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">

  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-bold mb-4">Strengths</h2>

    <ul className="space-y-2">
      <li>✓ Strong Technical Knowledge</li>
      <li>✓ Good Problem Solving</li>
      <li>✓ Clear Explanation</li>
    </ul>
  </div>

  

</div>
    </div>
  );
}

export default Result;