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
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);


  return (
    <>
      <div className="container mx-auto px-4 py-8   flex ">
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
        <div>
          section
        </div>
      </div>
    </>
  );
};

export default Home;
