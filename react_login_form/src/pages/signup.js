import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("password", password);
    formData.append("img", image);
    console.log(image,'image')
    console.log(formData,"trying to console form data")
    try {
      const res = await axios.post("http://localhost:8000/api/v1/newuser/crt",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error) {
      console.log(error,"error occured whilst creating user");
    }

    setUsername("");
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setImage(null);
    setImagePreview(null);
    setPasswordsMatch(true);
  };


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage)); // Set the image preview URL in state
      setImage(selectedImage);
    }
  };


  return (
    <div className="signup-container flex items-center justify-center min-h-screen">
      <div className="signup-content text-center max-w-screen-md w-full mx-auto">
        <h3 className="text-2xl font-semibold mt-6 text-blue-500">Sign Up</h3>
        <form className="bg-white p-6 rounded-lg">
          <div className="mb-6 flex items-center">
            <label
              htmlFor="username"
              className="text-sm font-bold text-gray-700 mr-4 w-1/4"
            >
              Username:
            </label>
            <input
              id="username"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <label
              htmlFor="email"
              className="text-sm font-bold text-gray-700 mr-4 w-1/4"
            >
              Email address:
            </label>
            <input
              id="email"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <label
              htmlFor="fullName"
              className="text-sm font-bold text-gray-700 mr-4 w-1/4"
            >
              Full Name:
            </label>
            <input
              id="fullName"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-700 mr-4 w-1/4"
            >
              Password:
            </label>
            <input
              id="password"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-bold text-gray-700 mr-4 w-1/4"
            >
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm your password"
              required
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>
          <div className="flex flex-col gap-5 items-center">
            <div className="mb-6 flex items-center">
              <label
                htmlFor="image"
                className="text-sm font-bold text-gray-700"
              >
                Profile Picture:
              </label>
              <input
                id="image"
                className="w-[100%] px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Call handleImageChange function on file selection
                required
              />
            </div>
            {imagePreview && (
              <div className="mb-6 flex items-center">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-32 h-32 rounded-full mr-4 object-cover"
                />
                {/* You can adjust the size and styling of the image preview */}
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full px-4 py-3 mt-4 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
