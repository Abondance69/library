import axios from "axios";
import { CONFIG } from "../config";

export default class BookServices {
  async getAllBooks() {
    try {
      const response = await axios.get(`${CONFIG.BACKEND_API_URL}/api/books`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Utilisateur non authentifié.");
    }
  }

  async getBook(id) {
    try {
      const response = await axios.get(
        `${CONFIG.BACKEND_API_URL}/api/book/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Utilisateur non authentifié.");
    }
  }

  async createBook(bookData) {
    try {
      const response = await axios.post(
        `${CONFIG.BACKEND_API_URL}/api/book`,
        bookData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la création du livre.");
    }
  }

  async updateBook(id, bookData) {
    try {
      const response = await axios.put(
        `${CONFIG.BACKEND_API_URL}/api/book/${id}`,
        bookData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la création du livre.");
    }
  }

  async deleteBook(id) {
    try {
      const response = await axios.delete(
        `${CONFIG.BACKEND_API_URL}/api/book/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la création du livre.");
    }
  }
}
