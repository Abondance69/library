import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Modal from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import { useBook } from "../../hooks/useBook";
import { toast, ToastContainer } from "react-toastify";
import image from "../../assets/images/image.jpg";

export default function Card({ book }) {
  const { isAuthenticated } = useAuth();
  const { getBook, deleteBook } = useBook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleModalToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter");
      return;
    }

    try {
      const bookDetails = await getBook(book._id);
      setSelectedBook(bookDetails);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Erreur lors de la récupération du livre.");
    }
  };

  const handleDelete = async () => {
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter");
      return;
    }

    try {
      await deleteBook(book._id);
      toast.success("Livre supprimé avec success");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Erreur lors de la suppréssion du livre.");
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-sm overflow-hidden border border-gray-300 transition-all">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
      />

      <div className="relative">
        <div>
          <img src={image} alt="Book" className="w-full h-48 object-cover" />
        </div>

        <button
          className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md cursor-pointer text-teal-700 text-lg text-center"
          onClick={handleModalToggle}
        >
          <CiEdit />
        </button>

        <button
          className="absolute top-3 right-11 bg-white p-1 rounded-full shadow-md cursor-pointer text-red-700 text-lg text-center"
          onClick={handleDelete}
        >
          <MdOutlineDeleteOutline />
        </button>
      </div>

      <div className="p-4">
        <div className="text-gray-900 hover:text-teal-700 pb-3">
          <div>{book.title}</div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="font-semibold text-gray-800 flex justify-center items-center text-sm">
              {book.author}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-600 ml-1">{book.category}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          handleModalToggle={() => setIsModalOpen(false)}
          book={selectedBook}
        />
      )}
    </div>
  );
}
