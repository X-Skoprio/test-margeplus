// src/app/api/getImageById/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const messageId = searchParams.get('messageId');

  if (!messageId) {
    return NextResponse.json({ error: 'MessageId is required' }, { status: 400 });
  }

  try {
    console.log("getImage route : message id :",messageId)
    console.log(`https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`)
    const response = await fetch(`https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MY_MIDJOURNEY_API}`, // Remplacez par votre clé API
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    const { uri } = data; // Assurez-vous que ce champ existe dans la réponse de l'API

    console.log("getImage route : data :",data)
    console.log("getImage route : uri :",uri)
    return NextResponse.json({ uri });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'image' }, { status: 500 });
  }
}
