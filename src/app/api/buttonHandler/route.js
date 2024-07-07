// src/app/api/generateImage/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
const body = await req.text()
const { messageId } = JSON.parse(body);
    
  try {
    const response = await fetch("https://api.mymidjourney.ai/api/v1/midjourney/button/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTU5NjgsImVtYWlsIjoibGF1cmVudEBtYXJnZXBsdXMuZnIiLCJ1c2VybmFtZSI6ImxhdXJlbnRAbWFyZ2VwbHVzLmZyIiwiaWF0IjoxNzIwMjg0Mzk1fQ.2Q_8WugH6hO8iTsI56Yv1MEdJT0GdDS2b1MpIg2UO1Q`, // Replace with your API key
      },
      body: JSON.stringify({   messageId, button : "U1" }),
    });

    const data = await response.json();
    console.log("buttonHandler ROUTE, data :",data);

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      throw new Error('Erreur lors de la génération de l\'image');
    }
  } catch (error) {
    console.error('Error during image generation:', error);
    return NextResponse.json({ error: 'Erreur lors de la génération de l\'image' }, { status: 500 });
  }
}
