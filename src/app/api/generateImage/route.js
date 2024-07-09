// src/app/api/generateImage/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.text();
  const { prompt } = JSON.parse(body);

  try {
    const response = await fetch('https://api.mymidjourney.ai/api/v1/midjourney/imagine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTU5NjgsImVtYWlsIjoibGF1cmVudEBtYXJnZXBsdXMuZnIiLCJ1c2VybmFtZSI6ImxhdXJlbnRAbWFyZ2VwbHVzLmZyIiwiaWF0IjoxNzIwMjg0Mzk1fQ.2Q_8WugH6hO8iTsI56Yv1MEdJT0GdDS2b1MpIg2UO1Q`, // Remplacez par votre clé API
      },
      body: JSON.stringify({ prompt}),
    });

    const data = await response.json();
    console.log(data);
    const { messageId, requestId } = data; // Assurez-vous que ces champs existent dans la réponse de l'API

    return NextResponse.json({ messageId, requestId });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la génération de l\'image' }, { status: 500 });
  }
}