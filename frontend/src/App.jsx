import React, { useState } from 'react';
 // If you're using Tailwind CSS, this might be empty or removed

function App() {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await response.json();
    setRecommendations(data.recommendations);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Movie Recommendation System</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="userId" className="text-lg font-medium text-gray-700">User ID:</label>
            <input
              id="userId"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User ID"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Recommendations
          </button>
        </form>
        {recommendations && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Recommendations:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recommendations.map((movie, index) => (
                <li key={index} className="text-gray-600">{movie}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
