import { useState, useEffect } from "react";
import BookServices from "../services/BookServices";

export const useBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getAllBooks = async () => {
    try {
      const bookServices = new BookServices();
      const response = await bookServices.getAllBooks();
      // console.log(response.books);
      setData(response.books);
      setLoading(false);
    } catch (err) {
      setError(true);
      setData(null);
    }
  };

  const getBook = async (id) => {
    try {
      const bookServices = new BookServices();
      const response = await bookServices.getBook(id);
      return response;
    } catch (error) {}
  };

  const deleteBook = async (id) => {
    try {
      const bookServices = new BookServices();
      const response = await bookServices.deleteBook(id);
      return response;
    } catch (error) {}
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  return { loading, error, data, getAllBooks, getBook, deleteBook };
};
