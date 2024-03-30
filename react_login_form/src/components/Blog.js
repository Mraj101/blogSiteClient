import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useAuthContext } from "../hooks/useAuthContext";

const Blog = ({
  title,
  content,
  imageUrl,
  blogId,
  userImage,
  userName,
  createdAt,
}) => {
  const { usr, setUsr } = useAuthContext(AuthContext);

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    setUsr(userDataFromStorage);
  }, []);

  return (
    <div className="container px-20 my-3 w-full">
      <div className="h-72 w-32 md:w-auto md:h-52 bg-white flex justify-between border border-gray-300 shadow-lg rounded-md p-4">
        <div className="flex flex-col justify-between ">
          <div className="flex gap-2">
            <img
              className="h-10 w-10 border border-black rounded-full object-cover"
              src={userImage}
              alt="alt"
            />
            <span className="mt-2">{userName}</span>
          </div>

          <div className="flex flex-col justify-between mr-8">
            <h2 className="text-xl font-bold mb-5">{title?.toUpperCase()}</h2>
            <p className="text-gray-600">  {content.length > 200 ? `${content.substring(0, 200)}...` : content}</p>
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

        <div className="flex flex-col justify-between items-center">
          <div>
            Blog Created:<span>{createdAt.split("T")[0]}</span>
          </div>
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
