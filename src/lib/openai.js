// lib/openai.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function getChatCompletion(prompt) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    return chatCompletion.data;
  } catch (error) {
    console.error('Error completing chat:', error);
    throw error;
  }
}
