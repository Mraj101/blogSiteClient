import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateBlog = () => {
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    imagePreview: null,
    imageLink: "",
  });

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    setUsr(userDataFromStorage);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    console.log("hit");
    e.preventDefault();
    const formInstance = new FormData();
    formInstance.append("title", formData.title);
    formInstance.append("content", formData.content);
    formInstance.append("img", formData.image);
    formInstance.append("user", usr._id);

    console.log(formInstance.entries()[0], "form instance");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/blogs/crt",
        formInstance,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "new");
      setFormData({
        title: "",
        content: "",
        imagePreview: "",
      });
      setLoading(false);
    } catch (error) {
      console.error("There was a problem creating the blog:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div
          role="status"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 py-8 flex items-center justify-center">
          <div className="max-w-xl w-full p-5 rounded-lg border border-gray-200 shadow-xl bg-white overflow-y-auto">
            <h1 className="text-3xl font-semibold text-center mb-2">
              Create a New Blog
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block text-lg font-medium mb-2"
                >
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-lg font-medium mb-2"
                >
                  Blog Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                  rows="6"
                  required
                />
              </div>
              <div className=" md:mb-2 lg:mb-2 xl:mb-2">
                <label
                  htmlFor="image"
                  className="block text-lg font-medium mb-2"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-blue-500"
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="mt-1 w-full rounded-md"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBlog;
