"use client";
import { useEffect, useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [updatedRecipes, setUpdatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingImageClick, setIsLoadingImageClick] = useState(false); // New state for loading image click
  const [change, setChange] = useState(false);
///une fois recette à la fois 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
  
        const recipesArray = Object.keys(jsonData).map((key) => ({
          RecipeID: key,
          ...jsonData[key],
        }));
  
        const filteredRecipes = recipesArray.filter(
          (recipe) =>
            recipe.ImageLink !== "" &&
            recipe.Validated &&
            recipe.SelectedImageButton === ""
        );
  
        const recipesWithImages = await Promise.all(
          filteredRecipes.map(async (recipe) => {
            const recipeId = recipe.RecipeID;
            const imageUrls = await Promise.all(
              [1, 2, 3, 4].map(async (number) => {
                try {
                  const imageUrl = `/promptImages/${recipeId}_${number}.png`;
                  const response = await fetch(imageUrl);
                  if (!response.ok) {
                    return null;
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
  
        console.log("Recipes with images:", recipesWithImages); // Log recipes with images
        setRecipes(recipesWithImages);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [change]);
  
  const handleImageClick = async (recipeId, imageIndex) => {
    try {
      handleOnChange();
      setLoading(true);
      const response = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RecipeID: recipeId,
          SelectedImageButton: `U${imageIndex}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update SelectedImageButton");
      }
  
      const jsonData = await response.json();
  
      const recipesArray = Object.keys(jsonData).map((key) => ({
        RecipeID: key,
        ...jsonData[key],
      }));

      const filteredRecipes = recipesArray.filter(
        (recipe) =>
          recipe.ImageLink !== "" &&
          recipe.Validated &&
          recipe.SelectedImageButton === ""
      );

      const recipesWithImages = await Promise.all(
        filteredRecipes.map(async (recipe) => {
          const recipeId = recipe.RecipeID;
          const imageUrls = await Promise.all(
            [1, 2, 3, 4].map(async (number) => {
              try {
                const imageUrl = `/promptImages/${recipeId}_${number}.png`;
                const response = await fetch(imageUrl);
                if (!response.ok) {
                  return null;
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

      console.log("Recipes with images:", recipesWithImages); // Log recipes with images
      setRecipes(recipesWithImages);
    } catch (error) {
      console.error("Error updating SelectedImageButton:", error);
      // Handle error as needed
    }
  };

  const handleOnChange = () => {
    setChange(!change);
  };
  
  
  return (
    <div className="w-full h-svh relative">
      <img src="/images/margeplus_logo_preview_rev_1.png" className="absolute w-36 left-16 top-5"></img>
  
    
        <ul>
          {!loading && <>
            {recipes.map((recipe, index) => (
  <li key={recipe.RecipeID} className={`${index != 0 ? "hidden" : ""}`}>
    <div className="w-full flex justify-center items-center">
      <p className={`font-bold h-full flex items-center justify-center mt-16 pr-5`}>
        ID: {recipe.RecipeID}
      </p>
      <p className={`w-[70%] flex items-center justify-center font-bold text-3xl border-t-2 border-b-2 border-primary mt-16 py-1 `}>
        {recipe.RecipeLabel}
      </p>
    </div>
    <div className="">
      <div className="grid grid-rows-2-2">
        <div className="">
          <ul className="flex justify-center items-center space-x-6 w-full mt-24">
            <p className="font-bold ml-4">Ingredients :</p>
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
                onClick={() => handleImageClick(recipe.RecipeID, index + 1)}
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
          disabled={isLoadingImageClick} // Disable button while loading
        >
          Regéner 4 images
        </button>
        <button
          className="btn-primary"
          onClick={() => handleImageClick(recipe.RecipeID, "RR")}
          disabled={isLoadingImageClick} // Disable button while loading
        >
          Regéner 4 images à partir d&apos;une image de référence aleatoire
        </button>
      </div>
    </div>
  </li>
))}
</>}
        </ul>
    </div>
  
);
};

export default Recipes;
