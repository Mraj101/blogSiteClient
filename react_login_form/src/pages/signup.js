import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Sign Up</h3>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">
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
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
