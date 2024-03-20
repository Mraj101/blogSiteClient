import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useAuthContext } from "../hooks/useAuthContext";

const Blog = ({ title, content, imageUrl, blogId }) => {
  const { user } = useAuthContext(AuthContext);

  return (
    <div className="container px-20 my-3 w-full">
      <div className="h-52 bg-white flex justify-between border border-gray-300 shadow-lg rounded-md p-4">
        <div className="flex flex-col justify-between">
          <div className="flex gap-2">
            <img className="h-10 w-10 border border-black rounded-full" 
            src="https://xsgames.co/randomusers/assets/avatars/male/63.jpg" 
            alt="" />
            <span className="mt-2">userName</span>
          </div>
          <div className="flex flex-col justify-between mr-8">
            <h2 className="text-xl font-bold mb-5">{title?.toUpperCase()}</h2>
            <p className="text-gray-600">{content}</p>
          </div>
          <div>
            <Link
              to={`/blogs/${blogId}`}
              className=" text-lg text-blue-500 hover:underline mt-2"
            >
              Read more
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
