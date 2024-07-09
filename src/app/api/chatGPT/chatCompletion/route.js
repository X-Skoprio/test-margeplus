// pages/api/chatCompletion.js

import { getChatCompletion } from '../../../../lib/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
  }

  const { prompt } = req.body;

  try {
    const completion = await getChatCompletion(prompt);
    res.status(200).json({ completion });
  } catch (error) {
    console.error('Error fetching chat completion:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
