import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      console.log("Login response:", res);
      res.accessToken ? navigate("/") : navigate("/login");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center my-2 mx-5 md:mx-0 md:my-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex gap-40 justify-center items-center">
      <div className="w-[40%]">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="w-[60%]">
        <div className="text-center md:text-left mb-5 font-bold">
          <label className="mr-1">Sign in with</label>
        </div>
       
        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between items-center mb-4">
            <label className="flex text-gray-500 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 font-semibold text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to={'/signup'}>
            Register
          </Link>
        </div>
      </div>

      </div>
    </section>
  );
};

export default Login;
