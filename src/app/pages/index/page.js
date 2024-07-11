// pages/index.js
"use client";
import { useState } from "react";
import XlsxXlsReader from "../../components/XlsxXlsReader.jsx";



export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messageId, setMessageId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [req2, setReq2] = useState("");
  const[show, setShow] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessageId(String(data.messageId));
        setReq2(`/api/getImage?messageId=${data.messageId}`);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Erreur lors de la communication avec l'API");
      console.log(error);
    }

    setLoading(false);
  };

  const handleGetImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log(messageId);
    console.log(req2);

    try {
      const response = await fetch(req2, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setImage(data.uri);
        console.log("index.js : image url : ", data.uri);
      } else {
        setError(data.error);
        console.log(data.error);
      }
    } catch (error) {
      setError("Erreur lors de la communication avec l'API");
    }

    setLoading(false);
  };

  const handleSelectImage = async (e) => {
    setShow(true);
    console.log(messageId);
    try {
      const response = await fetch("/api/buttonHandler/", {
        method: "POST",
        body: JSON.stringify({
          messageId,
        }),
      });
      const data = await response.json();
      console.log("handleSelectImage data :", data);
      setMessageId(String(data.messageId));
      console.log("handleSelectImage data.messageId",  data.messageId);
      
      const response2 = await fetch(req2, {
        method: "GET",
      });
      const data2 = await response2.json();
      console.log(data2);
      if (response.ok) {
        setImage(data2.uri);
        console.log("index.js : image url : ", data2.uri);
        setImage(data2.uri);
      } else {
        setError(data.error);
        console.log(data.error);
      }
    } catch (error) {
      console.log("ERROR : Index, handleSelectImage  : ", error);
    }
  };

  return (
    <>
      <div className="w-svw h-svh bg-white flex items-center justify-center space-x-4 shadow-inner-xl">
        <div className="grid grid-rows-4  w-[50%] p-40">
          <div className="">
            <form onSubmit={handleGenerate}>
              <label className="input-label">
                Prompt : 4e945793-57e2-402b-aa17-2131af69c720
                <input
                  className="input my-2"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Entrez votre prompt"
                  required
                />
              </label>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Génération en cours..." : "Générer"}
              </button>
            </form>
          </div>

          {messageId && (
         
              <div className="">
                <form onSubmit={handleGetImage}>
                  <label className="input-label">
                    Message ID :
                    <input
                      className="input my-2 w-full"
                      type="text"
                      value={messageId}
                      onChange={(e) => setMessageId(e.target.value)}
                      placeholder="Entrez le message ID"
                      required
                    />
                  </label>
                  <button
                    className="btn-primary m-1"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Récupération en cours..." : "Récupérer l'image"}
                  </button>
                </form>

                <button
                  className="btn-primary m-1"
                  onClick={handleSelectImage}
                  disabled={loading}
                >
                  {loading ? "U1 en cours" : "U1"}
                </button>
              </div>
      
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
         
    
        </div>
        
        <div className="w-[50%] grid place-items-center">
          {image && <img src={image} className="p-4" alt="Image générée par AI" />}
        </div>
      </div>
      <div className="p-10 mb-8">
          <XlsxXlsReader className=""></XlsxXlsReader>
          </div>
      {show &&
        <div className="px-10 w-full">
        <h1 className="text-primary font-bold text-2xl "> Images coupés </h1>
        <h1 className="text-primary font-bold text-xl mt-4 "> Poulet Curry Coco </h1>
        <div className="h-full w-full grid grid-col-4 grid-flow-col">
        <img className="w-[100%] h-[100%] p-4" src="https://cdn.discordapp.com/attachments/1257540209181196293/1259911087902425228/winonacunning271925_Generate_a_visually_captivating_representat_b6ebd655-02b6-40ab-bafd-2eb993fe160d.png?ex=668d6723&is=668c15a3&hm=f46f8c09b2e357fd4947bb4d61720203a24f81ec7e293434c869b7c3be6b1261&" ></img>
        <img className="w-[100%] h-[100%] p-4" src="/images/image_part_002.jpg" ></img>
        <img className="w-[100%] h-[100%] p-4" src="/images/image_part_003.jpg" ></img>
        <img className="w-[100%] h-[100%] p-4" src="/images/image_part_004.jpg" ></img>
        </div>
        </div>
      }
    
        
    </>
  );
}
