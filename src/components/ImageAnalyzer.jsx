import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export default function ImageAnalyzer() {
  const [file, setFile] = useState(null);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    const res = await fetch("https://us-central1-YOUR_PROJECT.cloudfunctions.net/analyzeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl })
    });

    const data = await res.json();
    setLabels(data.labels || []);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {labels.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold">Detected Labels:</h2>
          <ul className="list-disc pl-5">
            {labels.map((label, i) => (
              <li key={i}>
                {label.description} ({(label.score * 100).toFixed(1)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
