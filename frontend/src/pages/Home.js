import React from "react";
import Hero from "../components/Home/Hero";
import Card from "../components/Home/Card";
import { useBook } from "../hooks/useBook";
import Loader from "../components/Loader";

export default function Home() {
  const { loading, error, data: books } = useBook();

  return (
    <div className="max-w-7xl mx-auto p-4 md:px-8 md:py-4">
      <Hero count={books?.length} />

      {loading && <Loader />}
      {error && (
        <p className="text-red-500 text-center">
          Erreur lors du chargement des livres.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books && books.length > 0
          ? books.map((book) => <Card key={book._id} book={book} />)
          : !loading && (
              <p className="text-center col-span-full">
                Aucun livre disponible.
              </p>
            )}
      </div>
    </div>
  );
}
