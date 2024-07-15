import React from 'react';
import Link from 'next/link';

const RecipeCard = ({ recipe }) => (
  <div className="recipe-card">
    <h2>{recipe.RecipeLabel}</h2>
    <p>{recipe.Type}</p>
    <Link href={`/recipes/${recipe.RecipeID}`}>
      <a>View Recipe</a>
    </Link>
  </div>
);

export default RecipeCard;
