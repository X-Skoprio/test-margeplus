import { Container } from "postcss";
import React from "react";

const page = () => {
  const receipe = [
    {
      id: 1,
      recetteId: 1000014,
      name: "Tartiflette Maison ",
      type: "plat",
      ingredients: (
        <>
          <h1>Pomme de Terre Cube</h1>
          <h1>Reblochon Fermier AOP</h1>
          <h1>Lardon</h1>
          <h1>Crème Fraîche 6%</h1>
          <h1>Oignon</h1>
          <h1>Ail Blanc</h1>
          <h1>Huile d'Olive Extra Vierge</h1>
          <h1>Beurre Doux en Plaquette</h1>
          <h1>Sel et Poivre (pour Mémoire)</h1>
        </>
      ),
    },
  ];
  return (
    <div className="w-full h-full grid grid-cols-2">
      {/* Section Image */}
      <div className="w-full h-full p-36 border-2 border-primary relative">
      {receipe.map((recipe) => (
            <div
              key={recipe.id}
              className="w-full flex items-center justify-start shadow-2xl mb-2 rounded-t-sm border-y-2 border-primary p-1"
            >
              <h1 className="text-lg">
                <span className="font-bold">ID Recette :</span>{" "}
                {recipe.recetteId}
              </h1>
              <h1 className="ml-4 text-lg">
                <span className="font-bold">Nom :</span> {recipe.name}
              </h1>
              <h1 className="ml-4 text-lg">
                <span className="font-bold">Type :</span> {recipe.type}
              </h1>
            </div>
          ))}
        <img
          className="shadow-2xl"
          src="https://cdn.discordapp.com/attachments/1250738015375065141/1261717552803876986/clarenceeva51_37596_Capture_the_awe-inspiring_vision_of_a_bustl_802a445f-01db-4969-982c-ce1df8f9261a.png?ex=6693f98a&is=6692a80a&hm=e0b4dc0c0a6ca79793fa6f48211190f359e9af983ab7487dad1a0537e8c391c0&"
        ></img>
        <img className="absolute top-0" src="/images/margeplus_logo_preview_rev_1.png" width={120} height={120}></img>
      </div>

      <div className="w-full h-full px-20 flex flex-col justify-center items-center  ">
        <div className="w-full flex items-center justify-start my-4">
          <h1 className="font-bold text-2xl">Section Contrôle :</h1>
        </div>

        {/* Section button generation */}
        <div className="w-full grid grid-cols-2 gap-20">
          <div>
            <h1 className="mb-4 font-bold ">Quelle image te plaît ? </h1>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-primary w-24 h-10">U1</button>
              <button className="btn-primary w-24 h-10">U2</button>
              <button className="btn-primary w-24 h-10">U3</button>
              <button className="btn-primary w-24 h-10">U4</button>
            </div>
          </div>
          <div>
            <h1 className="mb-4 font-bold">Regénerer 4 images à partir de :</h1>
            <div className="grid grid-cols-2 gap-4 ">
              <button className="btn-primary w-24 h-10">V1</button>
              <button className="btn-primary w-24 h-10">V2</button>
              <button className="btn-primary w-24 h-10">V3</button>
              <button className="btn-primary w-24 h-10">V4</button>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-20 mt-8">
          <div>
            <h1 className="mb-4 font-bold ">Regénerer 4 images : </h1>
            <button className="btn-primary w-26 h-10">Regénerer</button>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-4 font-bold ">Regénerer avec image de référence : </h1>
            
            <input
              className="input mb-4"
              id="email"
              type="text"
              placeholder="lien image de référence"
            />
            <button className="btn-primary w-24">Régénrer</button>
          </div>
        </div>

        {/* Section Informations recette */}
        <div className="w-full flex items-center justify-start mt-10">
          <h1 className="font-bold text-2xl">Informations recette :</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-start ">
          
          {receipe.map((recipe) => (
            <div
              key={recipe.id}
              className="w-full flex items-center justify-start mt-4"
            >
              <h1 className="">
                <span className="font-bold">Ingredients :</span>{" "}
                {recipe.ingredients}
              </h1>
            </div>
          ))}
        </div>
        {/* Section titre controle */}
      </div>
    </div>
  );
};

export default page;
