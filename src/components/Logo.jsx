import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-2xl hover:opacity-80">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-indigo-500"
      >
        <path d="M12 20c4.418 0 8-4.03 8-9s-3.582-9-8-9-8 4.03-8 9c0 2.944 1.338 5.59 3.428 7.218L12 20z" />
        <path d="M8 14s1-2 4-2 4 2 4 2" />
      </svg>
      <span>Threaded</span>
    </Link>
  );
}