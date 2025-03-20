import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const formValidate = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    if (!email.trim()) {
      emailError = "Veuillez remplir votre email.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "L'email n'est pas valide.";
      valid = false;
    }

    if (!password.trim()) {
      passwordError = "Veuillez remplir votre mot de passe.";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError });
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidate()) return;

    const formData = { email, password };

    try {
      await login(formData);
      toast.success("Connexion réussie !");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center text-gray-600">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="shadow bg-white p-4 mt-4 max-w-md sm:mx-4">
        <h1 className="font-bold text-xl md:text-2xl">Se connecter</h1>
        <p className="text-gray-500">
          Entrer votre email et mot de passe pour vous connecter
        </p>
        <div className="w-full rounded-lg divide-y divide-gray-200">
          <div className="pt-7 pb-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition duration-200 rounded-sm ${
                    errors.email ? "border-red-600 focus:border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <small className="text-red-600 text-xs">{errors.email}</small>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2"
                >
                  Mot de passe
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 text-sm border border-gray-300 focus:outline-none focus:border-teal-600 transition duration-200 rounded-sm ${
                      errors.password
                        ? "border-red-600 focus:border-red-500"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="text-xl" />
                    ) : (
                      <FaRegEye className="text-xl" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <small className="text-red-600 text-xs text-start">
                    {errors.password}
                  </small>
                )}
              </div>

              <div className="text-right mb-4 mt-2">
                <Link to="/forgot" className="text-teal-800">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                className={`w-full px-4 bg-teal-800 hover:bg-teal-900 transition text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 duration-200 rounded-sm ${
                  loading ? "py-1" : "py-3"
                }`}
                disabled={loading}
              >
                {loading ? <Loader /> : "Se connecter"}
              </button>
            </form>
          </div>

          <div className="pb-5">
            <div className="text-center mt-2">
              <span>Pas de compte ? </span>
              <Link to="/register" className="text-teal-800">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
