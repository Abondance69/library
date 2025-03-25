import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkAuth, logoutUser } from "../store/slices/authSlice";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = async (formData) => {
    return dispatch(loginUser(formData)).unwrap();
  };

  const logout = async () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return { login, logout, user, isAuthenticated, loading, error };
};
