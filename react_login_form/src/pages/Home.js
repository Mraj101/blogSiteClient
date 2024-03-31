import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) setUsr(userDataFromStorage);
  }, []);

  const fetchAllBLogs =async()=>{
    axios
    .get("http://localhost:8000/api/v1/blogs/getAll")
    .then((response) => {
      const { data } = response.data;
      setBlogs(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error);
    })
  }

  const popularBLogs=async()=>{
     // Fetch popular blogs
     axios
     .get("http://localhost:8000/api/v1/viewcount/getAll")
     .then((response) => {
       const { data } = response.data;
       setPopularBlogs(data);
       setLoading(false);
     })
     .catch((error) => {
       console.error("Error fetching popular blogs:", error);
     });
     
  }

  useEffect(() => {
    // if (usr) {
    //   axios
    //     .post("http://localhost:8000/api/v1/blogs/get", usr)
    //     .then((response) => {
    //       const { data } = response.data;
    //       setBlogs(data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching blogs:", error);
    //     });
    // } else {}
    //  ;
    fetchAllBLogs();
    popularBLogs();
  }, []);

  console.log(popularBlogs.map((Singleblog,key)=>console.log(Singleblog)),"here is the pop blogs")

  return (
    <>
      {loading ? (
        // Render loading state
        <div
          role="status"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* Your loading animation */}
        </div>
      ) : (
        <div className="lg:flex md:flex grid w-full">
          <div className=" flex flex-col justify-center items-center  bg-gray-100 shadow-lg">
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
                      createdAt={blog.createdAt}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* popular blog section */}
          <div className=" bg-gray-50">
            <div className="m-12 p-5 rounded-md sticky right-5 top-32 shadow-lg border border-gray-200 ">
              <h1 className="font-bold text-xl mb-4">Popular Blogs</h1>
              <div className="flex flex-col space-y-4">
                {popularBlogs.map((Singleblog,key) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4 shadow-md border">
                    {console.log(Singleblog.title)}
                    <h2 className="text-lg font-semibold">Title:{Singleblog.title}</h2>
                    <p className="text-gray-600">Content:{Singleblog.content.substr(0,30)}</p>
                    <div className="flex relative">
                    <img className="h-16 w-16 object-cover rounded-lg " src={Singleblog.img} alt="img" />
                    <button className=" bg-gray-400 rounded-lg h-8 px-1 absolute right-8 top-5 text-white">Read More</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
