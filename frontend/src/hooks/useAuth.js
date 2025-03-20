import { useState, useEffect } from "react";
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

      setUser(response);
      setLoading(false);

      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const checkAuth = async () => {
    try {
      const userServices = new UserServices();
      const response = await userServices.checkAuth();
      console.log(response);
      setUser(response.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { login, loading, error, user, checkAuth };
};
