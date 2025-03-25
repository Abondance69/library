import React, { useState } from "react";
import Modal from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

export default function Hero({ count }) {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    if (isAuthenticated) {
      setIsModalOpen(!isModalOpen);
    } else {
      toast.error("Veuillez vous connecter");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
      />

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
      </div>

      {/* Modal */}
      {isModalOpen && <Modal handleModalToggle={handleModalToggle} />}
    </>
  );
}
