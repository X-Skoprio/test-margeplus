import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recipeId = searchParams.get('recipeId');

  try {
    const filePath = path.resolve(process.cwd(), 'public/data.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Ensure that data is an object
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      throw new Error('Data is not an object');
    }

    // Filter by recipeId if provided
    if (recipeId) {
      const recipe = data[recipeId];
      if (!recipe) {
        return NextResponse.json({ error: `Recipe with ID ${recipeId} not found` }, { status: 404 });
      }
      return NextResponse.json(recipe);
    }

    // Return all recipes if no recipeId is provided
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ message: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.text();
  const { RecipeID, SelectedImageButton } = JSON.parse(body);

  console.log('Body:', body);
  
  console.log('RecipeID:', RecipeID);
  console.log('SelectedImageButton:', SelectedImageButton);

  try {
    const filePath = path.resolve(process.cwd(), 'public/data.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(jsonData);

    // Check if RecipeID exists
    if (!data.hasOwnProperty(RecipeID)) {
      throw new Error(`Recipe with RecipeID ${RecipeID} not found`);
    }

    // Update SelectedImageButton for the specific recipe
    data[RecipeID].SelectedImageButton = SelectedImageButton;

    // Write updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    // Return updated data (if needed)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating SelectedImageButton:', error);
    return NextResponse.error({ message: 'Failed to update SelectedImageButton' });
  }
}