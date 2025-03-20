import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
import image from "../assets/images/image.jpg"; // Image du livre (tu peux changer cette source par une dynamique)
import profile from "../assets/images/man.jpg"; // Image du profil de l'auteur (tu peux aussi la rendre dynamique)

export default function Card() {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <div className="bg-white shadow-sm rounded-sm overflow-hidden border border-gray-300 transition-all">
      <div className="relative">
        <Link to="/book/1">
          <img src={image} alt="Book" className="w-full h-48 object-cover" />
        </Link>

        <button
          className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md cursor-pointer text-teal-700 text-xl"
          onClick={handleFavorite}
        >
          {favorite ? <IoMdHeart /> : <IoIosHeartEmpty />}
        </button>
      </div>

      <div className="p-4">
        {/* Titre */}
        <div className="text-gray-900 hover:text-teal-700 pb-3">
          <Link to="/book/1">Développeur flutter pour les nulls</Link>
        </div>

        {/* Auteur */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Link className="font-semibold text-gray-800 flex justify-center items-center text-sm hover:underline transition">
              John Doe
            </Link>
          </div>

          <div className="flex items-center justify-end">
            <FaStar className="text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">4.3 (12 avis)</span>
          </div>
        </div>
      </div>
    </div>
  );
}