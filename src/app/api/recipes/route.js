import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const dbName = 'MargePlus'; // Ensure this is the correct database name
const collectionName = 'recipes';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    const db = mongoose.connection.useDb(dbName); // Use the specific database
    const collection = db.collection(collectionName);
    return { collection };
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB");
    const db = mongoose.connection.useDb(dbName); // Use the specific database
    const collection = db.collection(collectionName);
    return { collection };
  } catch (error) {
    console.log("Error connecting to DB: ", error);
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get('recipeId');

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) {
      throw new Error('Failed to connect to the database');
    }

    const { collection } = dbConnection;

    let query = {};
    if (recipeId) {
      query = { _id: new ObjectId(recipeId) };
    }

    console.log('Query:', query);
    const recipes = await collection.find(query).toArray();

    if (recipeId && recipes.length === 0) {
      const response = { error: `Recipe with ID ${recipeId} not found` };
      console.log('Response:', response);
      return NextResponse.json(response, { status: 404 });
    }

    console.log('Response:', recipeId ? recipes[0] : recipes);
    return NextResponse.json(recipeId ? recipes[0] : recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ message: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { RecipeID, SelectedImageButton } = body;

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) {
      throw new Error('Failed to connect to the database');
    }

    const { collection } = dbConnection;

    const result = await collection.updateOne(
      { _id: new ObjectId(RecipeID) },
      { $set: { SelectedImageButton } }
    );

    if (result.matchedCount === 0) {
      const response = { error: `Recipe with ID ${RecipeID} not found` };
      console.log('Response:', response);
      return NextResponse.json(response, { status: 404 });
    }

    const response = { message: 'SelectedImageButton updated successfully' };
    console.log('Response:', response);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating SelectedImageButton:', error);
    return NextResponse.json({ message: 'Failed to update SelectedImageButton' }, { status: 500 });
  }
}
