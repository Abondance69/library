import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookServices from "../../services/BookServices";

export default function Modal({ handleModalToggle }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [ISBN, setISBN] = useState("");
  const [availableCopies, setAvailableCopies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      category,
      type,
      publishedYear,
      ISBN,
      availableCopies,
    };

    setLoading(true);

    try {
      const bookServices = new BookServices();
      const response = await bookServices.createBook(bookData);

      toast.success("Livre ajouté avec succès !");
      setError(null);
      handleModalToggle();
      // console.log(response);
    } catch (err) {
      setError(false);
      toast.error("Erreur lors de la création du livre.");
      setSuccessMessage("");
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleModalToggle}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
      />

      <div
        className="bg-white w-full sm:w-96 p-6 shadow-lg rounded-md z-60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-teal-800">
            Ajouter un nouveau livre
          </h2>

          <MdClose
            onClick={handleModalToggle}
            className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl"
          />
        </div>

        <form className="mt-3" onSubmit={handleSubmit}>
          {/* Titre */}
          <div className="mb-3">
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Titre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
            />
          </div>

          {/* Auteur */}
          <div className="mb-3">
            <label
              htmlFor="author"
              className="block text-sm font-semibold mb-2"
            >
              Auteur
            </label>
            <input
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
            />
          </div>

          {/* Catégorie */}
          <div className="mb-3">
            <label
              htmlFor="category"
              className="block text-sm font-semibold mb-2"
            >
              Catégorie
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Roman">Roman</option>
              <option value="Science-fiction">Science-fiction</option>
              <option value="Fantastique">Fantastique</option>
              <option value="Horreur">Horreur</option>
              <option value="Poésie">Poésie</option>
              <option value="Histoire">Histoire</option>
              <option value="Philosophie">Philosophie</option>
              <option value="Biographie">Biographie</option>
              <option value="Informatique">Informatique</option>
            </select>
          </div>

          {/* Type */}
          <div className="mb-3">
            <label htmlFor="type" className="block text-sm font-semibold mb-2">
              Type
            </label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
            >
              <option value="">Sélectionner un type</option>
              <option value="Livre">Livre</option>
              <option value="Magazine">Magazine</option>
              <option value="Article">Article</option>
              <option value="Ebook">Ebook</option>
            </select>
          </div>

          {/* ISBN */}
          <div className="mb-3">
            <label htmlFor="ISBN" className="block text-sm font-semibold mb-2">
              ISBN
            </label>
            <input
              type="text"
              name="ISBN"
              id="ISBN"
              value={ISBN}
              onChange={(e) => setISBN(e.target.value)}
              className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
            />
          </div>

          {/* Copies disponibles et Année de publication */}
          <div className="mb-3 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="availableCopies"
                className="block text-sm font-semibold mb-2"
              >
                Copies disponibles
              </label>
              <input
                type="number"
                name="availableCopies"
                id="availableCopies"
                value={availableCopies}
                onChange={(e) => setAvailableCopies(e.target.value)}
                className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="publishedYear"
                className="block text-sm font-semibold mb-2"
              >
                Année de publication
              </label>
              <input
                type="number"
                name="publishedYear"
                id="publishedYear"
                min="0"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition rounded-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-800 text-white py-2 rounded-sm hover:bg-teal-900 transition"
            disabled={loading}
          >
            {loading ? "Chargement..." : "Ajouter"}
          </button>
        </form>
      </div>
    </div>
  );
}
