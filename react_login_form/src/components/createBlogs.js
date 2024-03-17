import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    imagePreview: null,
    imageLink: "",
  });

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
    e.preventDefault();
    const formInstance = new FormData();

    // const blogData = {
    //   title: formData.title,
    //   content: formData.content,
    //   img: formData.image, // Assuming you have a 'path' property in your uploaded file object
    // };
    // console.log(blogData,"blog data");

    // formInstance.append('my form Data',blogData);

    formInstance.append("title", formData.title);
    formInstance.append("content", formData.content);
    formInstance.append("img", formData.image); 

    // console.log("FormData entries:");
    // const entries = [];
    // for (const entry of formInstance.entries()) {
    //   entries.push(entry);
    // }
    console.log(...formInstance.entries());
    // console.log(formInstance.entries(), "form entries");

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
      // console.log("Blog created successfully!", response.data);
      // Reset form fields
      setFormData({
        title: "",
        content: "",
        imagePreview: "",
        // imageLink: "",
      });
    } catch (error) {
      console.error("There was a problem creating the blog:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create a New Blog
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields as before */}
        <div className="mb-4">
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
        <div className="mb-4">
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
              alt=" Preview"
              className="mt-3 w-full rounded-md"
            />
          )}
        </div>

        {/* imgage link preview. */}
        {/* <div className="mb-4">
          <label htmlFor="imageLink" className="block text-lg font-medium mb-2">
            paste your image link here
          </label>
          <input
            type="text"
            id="imageLink"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
          />
          {formData.imageLink && !formData.imagePreview && (
            <img
              src={formData.imageLink}
              alt="Image Preview"
              className="mt-3 w-full rounded-md"
            />
          )}
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
