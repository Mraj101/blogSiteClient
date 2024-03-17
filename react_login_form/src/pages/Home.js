import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import axios from "axios";

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
      <div className="container mx-auto px-4 py-8 flex relative">
        <div className=" mx-auto w-[80%]">
          {blogs.map((blog, index) => (
            <Blog
              key={index}
              title={blog.title}
              content={blog.content}
              imageUrl={blog.img}
            />
          ))}
        </div>
        <div className="border border-gray-300 w-[200px] rounded-lg text-center fixed right-5 h-[60px]">
          <h1>Popular blogs</h1>
          <div>
            <h2>Title: </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
