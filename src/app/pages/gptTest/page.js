// pages/index.js
"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [completion, setCompletion] = useState('');

  const handleFetchCompletion = async () => {
    try {
      const response = await axios.post('../../api/chatCompletion', { prompt });
      setCompletion(response.data.completion);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
    }
  };

  return (
    <div>
      <h1>Fetch Chat Completion</h1>
      <div>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button onClick={handleFetchCompletion}>Fetch Completion</button>
      </div>
      {completion && (
        <div>
          <h2>Completion:</h2>
          <p>{completion}</p>
        </div>
      )}
    </div>
  );
}
