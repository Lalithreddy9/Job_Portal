import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const RecuiterLogin = () => {
  const { backendUrl, setCompanyData, setCompanyToken, setError } =
    useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginFromSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/company/login`, {
        email,
        password,
      });

      if (data.success) {
        setCompanyData(data.companyData);
        setCompanyToken(data.token);
        localStorage.setItem("companyToken", data.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message);
        setError(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setError(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-md px-4 space-y-8">
          <form
            onSubmit={handleLoginFromSubmit}
            className="mt-8 space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-[25px] font-bold text-gray-700">
                Recruiter Login
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Welcome back! Please login to continue
              </p>
            </div>
            <div className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Login
              </button>
              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <Link
                  to="/recuiter-signup"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RecuiterLogin;
