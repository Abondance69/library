import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookServices from "../services/BookServices";

export default function Modal({ handleModalToggle, book }) {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [category, setCategory] = useState(book?.category || "");
  const [type, setType] = useState(book?.type || "");
  const [publishedYear, setPublishedYear] = useState(book?.publishedYear || "");
  const [ISBN, setISBN] = useState(book?.ISBN || "");
  const [availableCopies, setAvailableCopies] = useState(
    book?.availableCopies || 0
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setType(book.type);
      setPublishedYear(book.publishedYear);
      setISBN(book.ISBN);
      setAvailableCopies(book.availableCopies);
    } else {
      setTitle("");
      setAuthor("");
      setCategory("");
      setType("");
      setPublishedYear("");
      setISBN("");
      setAvailableCopies(0);
    }
  }, [book]);

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

      if (!book) {
        await bookServices.createBook(bookData);
        toast.success("Livre ajouté avec succès !");
      } else {
        await bookServices.updateBook(book._id, bookData);
        toast.success("Livre modifié avec succès !");
      }

      handleModalToggle();
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      toast.error("Erreur lors de l'opération.");
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
                min="0"
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
