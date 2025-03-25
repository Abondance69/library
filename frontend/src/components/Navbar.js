import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-b-gray-300">
      <Link to="/">
        <h1 className="text-4xl font-bold text-teal-800">Library</h1>
      </Link>

      <div className="flex items-center">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-teal-800 font-semibold">Bonjour, {user?.firstname} {user?.lastname}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-700 mx-1 rounded-sm hover:bg-teal-800 transition text-white"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-teal-700 mx-1 rounded-sm hover:bg-teal-800 transition text-white"
            >
              Créer un compte
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
