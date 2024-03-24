import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateBlog = () => {
  const { usr , setUsr } = useAuthContext()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    imagePreview: null,
    imageLink: "",
  });

    useEffect(() => {
      const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
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
    console.log('hit');
    e.preventDefault();
    const formInstance = new FormData();

    formInstance.append("title", formData.title);
    formInstance.append("content", formData.content);
    formInstance.append("img", formData.image);
    formInstance.append('user',usr._id)

    console.log(formInstance.entries()[0],"form instance")

    
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
      console.log(response,"new");
      setFormData({
        title: "",
        content: "",
        imagePreview: "",
      });
    } catch (error) {
      console.error("There was a problem creating the blog:", error);
    }
  };

  return (
    <div className="w-full px-4 py-8 flex items-center justify-center">
      <div className="max-w-xl w-full p-5 rounded-lg border border-gray-200 shadow-xl bg-white overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center mb-2">
          Create a New Blog
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="title" className="block text-lg font-medium mb-2">
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
            <label htmlFor="content" className="block text-lg font-medium mb-2">
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
            <label htmlFor="image" className="block text-lg font-medium mb-2">
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
  );
};

export default CreateBlog;
