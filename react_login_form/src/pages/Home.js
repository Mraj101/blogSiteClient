import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/blogs/get")
      .then((response) => {
        const { data } = response.data;
        setBlogs(data);
        console.log(data, "react kahini");
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-[90%] grid">
          {blogs && (
            <div className="container px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
                {blogs.map((blog, index) => (
                  <Blog
                    key={index}
                    title={blog.title}
                    content={blog.content}
                    imageUrl={blog.img}
                    blogId={blog._id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Link
            to="create"
            className="border border-gray-300 w-64 rounded-lg text-center sticky right- top-96 py-4 shadow-lg bg-white"
          >
            <h1 className="font-bold text-xl mb-4">Popular Blogs</h1>
            <div className="flex flex-col space-y-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-lg font-semibold">Popular Blog 1</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-lg font-semibold">Popular Blog 2</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-lg font-semibold">Popular Blog 3</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
