import { useState } from "react";
import axios from "axios"; // Import Axios
import { UseLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = UseLogin();
  const navigate= useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res  = await login(email, password)
        console.log("Login response:",res);
        res.accessToken?navigate('/'):navigate('/login')
    } catch (error) {
      // Handle error
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 h-[570px]">
      {/* Brand name section */}
      <div className="mr-5 w-1/2 p-8 rounded-l-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Bloggers Point</h1>
      </div>
      {/* Login form section */}
      <form className="w-1/2 max-w-md p-8 bg-white rounded-r-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Log In</h3>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700"
          >
            Email address:
          </label>
          <input
            id="email"
            className="w-full px-4 py-3 mt-2 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email address"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700"
          >
            Password:
          </label>
          <input
            id="password"
            className="w-full px-4 py-3 mt-2 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />
        </div>

        <button
          className="w-full px-4 py-3 mt-4 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
