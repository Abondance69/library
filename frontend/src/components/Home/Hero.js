import React, { useState } from "react";
import Modal from "./Modal";

export default function Hero({ count }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-between items-center my-6">
      <div className="text-3xl text-teal-800 font-semibold">
        Nos livres ({count})
      </div>

      <button
        onClick={handleModalToggle}
        className="bg-teal-800 hover:bg-teal-900 transition text-white py-2 px-4 rounded-sm"
      >
        Ajouter un livre
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal handleModalToggle={handleModalToggle} />
      )}
    </div>
  );
}
