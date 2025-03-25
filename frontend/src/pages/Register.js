import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Loader from "../components/Loader";
import UserServices from "../services/UserServices";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formValidate = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";
    let firstnameError = "";
    let lastnameError = "";

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

    if (!firstname.trim()) {
      firstnameError = "Veuillez remplir votre prénom.";
      valid = false;
    }

    if (!lastname.trim()) {
      lastnameError = "Veuillez remplir votre nom.";
      valid = false;
    }

    setErrors({
      email: emailError,
      password: passwordError,
      firstname: firstnameError,
      lastname: lastnameError,
    });
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidate()) return;

    const formData = { email, password, firstname, lastname };

    try {
      setLoading(true);
      const userServices = new UserServices();
      await userServices.register(formData);
      toast.success("Inscription réussie !");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err || "Échec lors de l'inscription.");
    }
  };

  return (
    <div className="flex justify-center text-gray-600">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
      />

      <div className="shadow bg-white p-4 mt-4 max-w-md sm:mx-4">
        <h1 className="font-bold text-xl md:text-2xl">S'inscrire</h1>
        <p className="text-gray-500">
          Entrer votre email et mot de passe pour vous s'inscrire
        </p>

        <div className="w-full rounded-lg divide-y divide-gray-200">
          <div className="pt-7 pb-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-semibold mb-2"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className={`w-full p-3 text-sm border ${
                    errors.firstname ? "border-red-600" : "border-gray-300"
                  } focus:outline-none focus:border-teal-600 transition rounded-sm`}
                />
                {errors.firstname && (
                  <small className="text-red-600 text-xs">
                    {errors.firstname}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-semibold mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className={`w-full p-3 text-sm border ${
                    errors.lastname ? "border-red-600" : "border-gray-300"
                  } focus:outline-none focus:border-teal-600 transition rounded-sm`}
                />
                {errors.lastname && (
                  <small className="text-red-600 text-xs">
                    {errors.lastname}
                  </small>
                )}
              </div>

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
                  className={`w-full p-3 text-sm border ${
                    errors.email ? "border-red-600" : "border-gray-300"
                  } focus:outline-none focus:border-teal-600 transition rounded-sm`}
                />
                {errors.email && (
                  <small className="text-red-600 text-xs">{errors.email}</small>
                )}
              </div>

              <div className="relative mb-4">
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
                    className={`w-full p-3 text-sm border ${
                      errors.password ? "border-red-600" : "border-gray-300"
                    } focus:outline-none focus:border-teal-600 transition rounded-sm`}
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
                  <small className="text-red-600 text-xs">
                    {errors.password}
                  </small>
                )}
              </div>

              <div className="text-right mb-4">
                <Link to="/forgot" className="text-teal-800">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                className={`w-full px-4 bg-teal-800 hover:bg-teal-900 transition text-white text-sm font-semibold rounded-sm ${
                  loading ? "py-1" : "py-3"
                }`}
                disabled={loading}
              >
                {loading ? <Loader /> : "S'inscrire"}
              </button>
            </form>
          </div>

          <div className="pb-5 text-center mt-2">
            <span>Avez-vous un compte ? </span>
            <Link to="/login" className="text-teal-800">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
