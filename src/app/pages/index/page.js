// pages/index.js
"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messageId, setMessageId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [req2, setReq2] = useState("");

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
    console.log(messageId);
    try {
      const response = await fetch("/api/buttonHandler/", {
        method: "POST",
        body: JSON.stringify({
           messageId,
        }),
      });
      const data = await response.json();
      console.log("handleSelectImage data :",data);
      setMessageId(String(data.messageId));
      console.log("handleSelectImage data.messageId",data.messageId);
    } catch (error) {
      console.log("ERROR : Index, handleSelectImage  : ", error);
    }
  };

  return (
    <div className="w-svw h-svh bg-white flex items-center justify-center space-x-4 shadow-inner-xl">
      <h1>Générateur d'images AI :</h1>
      <form onSubmit={handleGenerate}>
        <input
          className="input"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Entrez votre prompt"
          required
        />
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Génération en cours..." : "Générer"}
        </button>
      </form>
      {messageId && (
        <>
          <form onSubmit={handleGetImage} className="flex items-center justify-center">
            <input
              className="input"
              type="text"
              value={messageId}
              onChange={(e) => setMessageId(e.target.value)}
              placeholder="Entrez le message ID"
              required
            />
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Récupération en cours..." : "Récupérer l'image"}
            </button>
          </form>
          <button className="btn-primary" onClick={handleSelectImage} disabled={loading}>
            {loading ? "U1 en cours" : "U1"}
          </button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="w-1/4 h-1/4">
        {image && <img src={image} alt="Image générée par AI" />}
      </div>
    </div>
  );
}
