// src/pages/UploadDonation.jsx
import React, { useState } from "react";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UploadDonation() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file || !description) return;
    setLoading(true);

    try {
      const fileRef = ref(storage, `donations/${file.name}`);
      await uploadBytes(fileRef, file);
      const imageUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, "donations"), {
        imageUrl,
        description,
        postedBy: auth.currentUser?.email || "anonymous",
        createdAt: Timestamp.now(),
      });

      setLoading(false);
      navigate("/donor-dashboard"); // or wherever you show uploaded donations
    } catch (err) {
      console.error("Upload failed", err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Upload a Donation</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <textarea
          placeholder="Describe the item you're donating"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
          rows={3}
        />

        <button
          onClick={handleUpload}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit Donation"}
        </button>
      </div>

      <Link
        to="/upload"
        className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl text-center p-8 hover:bg-gray-50"
      >
        <div className="text-3xl mb-2">⬆️</div>
        <p className="text-sm font-medium text-gray-600">Upload a Donation</p>
      </Link>
    </>
  );
}