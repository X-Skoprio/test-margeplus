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
          <h1>Huile d&apos;Olive Extra Vierge</h1>
          <h1>Beurre Doux en Plaquette</h1>
          <h1>Sel et Poivre (pour Mémoire)</h1>
        </>
      ),
    },
  ];
  return (
    <div className="w-full h-full grid grid-cols-2 shadow-inner-[inset_0_0_0_20px] ">
      {/* Section Image */}
      <div className="w-full h-full p-36 border-2 border-primary relative">
        {receipe.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full flex items-center justify-start shadow-2xl mb-2 rounded-t-sm border-y-2 border-primary p-1"
          >
            <h1 className="ml-4 text-3xl w-full flex items-center justify-center">
              <span className="font-bold"> {recipe.name}</span>
            </h1>
          </div>
        ))}
        <img
          className="shadow-2xl"
          src="https://image.mymidjourney.ai/storage/v1/object/public/cdn/3c49fa9a-c6ed-433e-882e-0d7346e05ed2.png"
        ></img>
        <img
          className="absolute top-0"
          src="/images/margeplus_logo_preview_rev_1.png"
          width={120}
          height={120}
        ></img>
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
            <h1 className="mb-4 font-bold ">
              Regénerer avec image de référence :{" "}
            </h1>

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
              className="w-full flex flex-col items-start justify-center mt-4"
            >
              <div className="flex flex-col mb-4">
                <h1 className="text-lg">
                  <span className="font-bold">ID Recette :</span>{" "}
                  {recipe.recetteId}
                </h1>
                <h1 className=" text-lg">
                  <span className="font-bold">Type :</span> {recipe.type}
                </h1>
              </div>

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
