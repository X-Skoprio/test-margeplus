"use client";
import { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        // Convert the object into an array of recipes
        const recipesArray = Object.keys(jsonData).map((key) => ({
          RecipeID: key,
          ...jsonData[key],
        }));

        // Filter recipes based on conditions
        const filteredRecipes = recipesArray.filter(
          (recipe) =>
            recipe.ImageLink !== "" &&
            recipe.Validated &&
            recipe.SelectedImageButton === ""
        );

        // Fetch image URLs for each recipe
        const recipesWithImages = await Promise.all(
          filteredRecipes.map(async (recipe) => {
            const recipeId = recipe.RecipeID;
            const imageUrls = await Promise.all(
              [1, 2, 3, 4].map(async (number) => {
                try {
                  const imageUrl = `/promptImages/${recipeId}_${number}.png`; // Adjust file extension as per your images
                  const response = await fetch(imageUrl);
                  if (!response.ok) {
                    return null; // Image not found or error fetching
                  }
                  return imageUrl;
                } catch (error) {
                  console.error(`Error fetching image ${imageUrl}:`, error);
                  return null;
                }
              })
            );
            return { ...recipe, imageUrls };
          })
        );

        setRecipes(recipesWithImages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = async (recipeId, imageIndex) => {
    try {
      const response = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RecipeID: recipeId,
          SelectedImageButton: `U${imageIndex}`,
        }), // Adjusted index
      });

      if (!response.ok) {
        throw new Error("Failed to update SelectedImageButton");
      }

      const updatedRecipes = await response.json();
      setRecipes(updatedRecipes); // Update state with the updated recipes
    } catch (error) {
      console.error("Error updating SelectedImageButton:", error);
      // Handle error as needed
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-svh relative">
      <img src="/images/margeplus_logo_preview_rev_1.png" className="absolute w-36 left-16 top-5"></img>
      {recipes.length === 0 ? (
        <p>No recipes found that match the criteria.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.RecipeID}>
              <div className="w-full flex justify-center items-center">
                <p className="font-bold h-full flex items-center justify-center mt-16 pr-5">
                  ID: {recipe.RecipeID}
                </p>
                <p className="w-[50%] flex items-center justify-center font-bold text-3xl border-t-2 border-b-2 border-primary mt-16">
                  {recipe.RecipeLabel}
                </p>
              </div>
              <div className="">
                <div className="grid grid-rows-2-2">
                  <div className="">
                    
             

                  
                    <ul className="p- flex justify-center items-center space-x-6 w-full mt-24">
                    <p className="font-bold ml-4">Ingredients:</p>
                      {recipe.Ingredients.map((ingredient, index) => (
                        <li key={index} className="">
                          <p>{ingredient["Produit"]}</p>
                        </li>
                      ))}
                    </ul>
              
                  </div>
                  <div className="grid grid-cols-4 gap-4 col-span-1 px-16 py-8">
                    {recipe.imageUrls.map((imageUrl, index) => (
                      <div key={index} className="flex justify-start items-start">
                        <img
                          src={imageUrl}
                          alt={`Recipe ${recipe.RecipeID} Image ${index + 1}`}
                          onClick={() =>
                            handleImageClick(recipe.RecipeID, index + 1)
                          }
                          className="cursor-pointer mb-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full flex justify-center space-x-8 mb-36">
                <button
                  className="btn-primary"
                  onClick={() => handleImageClick(recipe.RecipeID, "R")}
                >
                  Regéner 4 images
                </button>
                <button
                  className="btn-primary"
                  onClick={() => handleImageClick(recipe.RecipeID, "RR")}
                >
                  Regéner 4 images avec REF
                </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recipes;
