// src/components/DonationGallery.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function DonationGallery() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDonations(items);
    };
    fetchDonations();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {donations.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow hover:shadow-md border overflow-hidden"
        >
          <img
            src={item.imageUrl}
            alt={item.description}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-sm text-gray-700">
            <p className="font-medium mb-1">{item.description}</p>
            <p className="text-xs text-gray-500">{item.postedBy}</p>
          </div>
        </div>
      ))}

      {/* Upload Tile */}
      <Link
        to="/upload"
        className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl text-center p-8 hover:bg-gray-50"
      >
        <div className="text-3xl mb-2">⬆️</div>
        <p className="text-sm font-medium text-gray-600">Upload a Donation</p>
      </Link>
    </div>
  );
}
