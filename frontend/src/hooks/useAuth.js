import { useState } from "react";
import UserServices from "../services/UserServices";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const userServices = new UserServices();
      const response = await userServices.login(formData);

      setUser(response.data);
      setLoading(false);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion.");
      setLoading(false);
    }
  };

  return { login, loading, error, user };
};
