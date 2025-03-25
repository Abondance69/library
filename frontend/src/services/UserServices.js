import axios from "axios";
import Cookies from "js-cookie";
import { CONFIG } from "../config";

export default class UserServices {
  async register(formData) {
    try {
      const response = await axios.post(
        `${CONFIG.BACKEND_API_URL}/api/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.msg || "Erreur de connexion");
      } else if (error.request) {
        throw new Error("Aucune réponse du serveur. Vérifiez votre connexion.");
      } else {
        throw new Error("Une erreur inconnue est survenue.");
      }
    }
  }

  async login(formData) {
    try {
      const response = await axios.post(
        `${CONFIG.BACKEND_API_URL}/api/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.msg || "Erreur de connexion");
      } else if (error.request) {
        throw new Error("Aucune réponse du serveur. Vérifiez votre connexion.");
      } else {
        throw new Error("Une erreur inconnue est survenue.");
      }
    }
  }

  async checkAuth() {
    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Aucun token trouvé. Veuillez vous reconnecter.");
      }

      const response = await axios.get(`${CONFIG.BACKEND_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw new Error("Utilisateur non authentifié.");
    }
  }
}
