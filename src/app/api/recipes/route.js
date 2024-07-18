import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const dbName = 'MargePlus'; // Ensure this is the correct database name
const collectionName = 'recipes';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState >= 1) {
    return { collection: cachedDb.collection(collectionName) };
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to DB");
  }

  cachedDb = mongoose.connection.useDb(dbName);
  const collection = cachedDb.collection(collectionName);
  return { collection };
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

    let query = {
      imageLink: { $exists: true, $ne: null },
      isValidated: true,
      SelectedImageButton: { $exists: false }
    };
    if (recipeId) {
      query = { _id: new ObjectId(recipeId) };
    }

    console.log('Query:', query);
    const recipe = await collection.findOne(query);

    if (recipeId && !recipe) {
      const response = { error: `Recipe with ID ${recipeId} not found` };
      console.log('Response:', response);
      return NextResponse.json(response, { status: 404 });
    }

    console.log('Response:', recipe);
    return NextResponse.json(recipe);
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
