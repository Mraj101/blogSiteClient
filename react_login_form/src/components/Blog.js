import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useAuthContext } from "../hooks/useAuthContext";

const Blog = ({ title, content, imageUrl, blogId }) => {
  const { user } = useAuthContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-8 w-[60%]  ">
      <div className="border border-gray-50 max-w-4xl mx-auto  shadow-lg rounded-lg overflow-hidden m-4 bg-gray-50">
        <Link to={`/blog/${blogId}`}>
          <img
            src={imageUrl}
            alt="Blog Post Image"
            className="w-full h-[300px] object-contain hover:scale-105 transition duration-300 ease-in-out"
          />
        </Link>
        <div className="p-6 bg-blue-300">
          <h2 className="text-3xl font-semibold mb-4">Title: {title}</h2>
          <p className="text-gray-700 leading-relaxed break-words">
            Content: {content}
          </p>
        </div>
        <Link to={`/blog/${blogId}`}>
          <div className="text-center bg-red-300 hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105 py-2 rounded-md">
            Read more
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
