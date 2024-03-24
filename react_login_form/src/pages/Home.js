import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { usr, setUsr } = useAuthContext();

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) setUsr(userDataFromStorage);
  }, []);


 useEffect(() => {
    if (usr) {
      axios
        .post("http://localhost:8000/api/v1/blogs/get", usr)
        .then((response) => {
          const { data } = response.data;
          setBlogs(data);
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    } else {
      axios
        .get("http://localhost:8000/api/v1/blogs/getAll")
        .then((response) => {
          const { data } = response.data;
          setBlogs(data);
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        });
    }
  }, [usr]);

  console.log(blogs, "blogs are here");

  return (
    <>
      <div className="flex w-full">
        <div className="w-[70%] flex flex-col justify-center items-center  bg-gray-100 shadow-lg">
          {blogs && (
            <div className="container px-4 py-8 bg-cream">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-1">
                {blogs.map((blog, index) => (
                  <Blog
                    key={index}
                    title={blog.title}
                    content={blog.content}
                    imageUrl={blog.img}
                    blogId={blog._id}
                    userImage={blog.userImage}
                    userName={blog.userName}
                    createdAt={ blog.createdAt }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-[30%] bg-gray-50">
          <div className="m-12 p-5 rounded-md sticky right-5 top-32 shadow-lg border border-gray-200 ">
            <h1 className="font-bold text-xl mb-4">Popular Blogs</h1>
            <div className="flex flex-col space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 shadow-md border">
                <h2 className="text-lg font-semibold">Popular Blog 1</h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              {/* <div className="bg-gray-100 rounded-lg p-4">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
