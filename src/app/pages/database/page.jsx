// src/app/recipes/page.jsx
import fs from 'fs';
import path from 'path';

const RecipesPage = async () => {
  const filePath = path.join(process.cwd(), 'public', 'recipes.json');
  let recipes = [];

  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    recipes = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  if (!Array.isArray(recipes) || recipes.length === 0) {
    return <div>No recipes found.</div>;
  }

  return (
    <div className='grid place-items-center'>
    <div className='grid place-items-center w-[50%]'>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe.RecipeID} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{recipe.RecipeLabel}</h2>
          <p><strong>Type:</strong> {recipe.Type}</p>
          <p><strong>Portion Price:</strong> {recipe.PortionPrice}</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.Ingredients.map((ingredient, index) => (
              <li className="pl-8" key={index}>
                <strong>{ingredient['Produit']}:</strong> {ingredient['Volume Portion']} {ingredient['Unit']} (Portion Price: {ingredient['Portion Price']}, Barometric Price: {ingredient['Barometric Price']})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RecipesPage;
