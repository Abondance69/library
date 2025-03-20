import axios from "axios";
import { CONFIG } from "../config";

export default class BookServices {
  async getAllBooks() {
    try {
      const response = await axios.get(`${CONFIG.BACKEND_API_URL}/books`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Utilisateur non authentifié.");
    }
  }
  async getBook() {}
}
