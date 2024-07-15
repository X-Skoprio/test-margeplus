import { useState, useEffect } from 'react';

export function useRecipeData() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/recipes'); // Adjust API endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Filter and process data as needed
        const filteredRecipes = jsonData.filter(recipe => (
          recipe.ImageLink !== "" &&
          recipe.Validated &&
          recipe.SelectedImageButton === ""
        ));

        // Simulate fetching images (replace with actual logic)
        const recipesWithImages = await Promise.all(filteredRecipes.map(async (recipe) => {
          const recipeId = recipe.RecipeID;
          const imageUrls = await Promise.all([1, 2, 3, 4].map(async (number) => {
            try {
              const imageUrl = `/promptImages/${recipeId}_${number}.png`; // Adjust file extension and path as per your setup
              const imageResponse = await fetch(imageUrl);
              if (!imageResponse.ok) {
                return null; // Handle image not found or error
              }
              return imageUrl;
            } catch (error) {
              console.error(`Error fetching image ${imageUrl}:`, error);
              return null;
            }
          }));
          return { ...recipe, imageUrls };
        }));

        setRecipes(recipesWithImages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { recipes, loading, error };
}
