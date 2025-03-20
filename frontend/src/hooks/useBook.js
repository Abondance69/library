import { useState, useEffect } from "react";
import BookServices from "../services/BookServices";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getAllBooks = async () => {
    try {
      const bookServices = new BookServices();
      const response = await bookServices.getAllBooks();
      console.log(response);
      setData(response.data);
    } catch (err) {
      setData(null);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return { loading, error, data, getAllBooks };
};
