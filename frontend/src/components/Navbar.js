import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-b-gray-300">
      <Link to="/">
        <h1 className="text-4xl font-bold text-teal-800">Library</h1>
      </Link>

      <div className="flex items-center text-white">
        <Link
          to="/login"
          className="px-4 py-2 bg-teal-700 mx-1 rounded-sm hover:bg-teal-800 transition"
        >
          Se connecter
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-teal-700 mx-1 rounded-sm hover:bg-teal-800 transition"
        >
          Créer un compte
        </Link>
      </div>
    </nav>
  );
}
