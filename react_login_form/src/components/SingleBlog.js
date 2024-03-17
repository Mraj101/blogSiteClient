import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  console.log(id, "from params");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/blogs/getSingle/${id}`
        );
        setBlog(response.data);
        console.log(response,"the response");
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);
  console.log(blog, "blog");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setComments([{ text: comment, replies: [] }, ...comments]);
      setComment("");
    }
  };

  const handleReply = (index) => {
  };

  const handleReplySubmit = () => {
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 w-[80%] bg-gray-100">
      <div className="border border-gray-50 max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden m-4 bg-gray-50">
        <img
          src={blog.data.img} // Changed from blog.imageUrl
          alt="Blog Post Image"
          className="w-full h-[300px] object-contain"
        />
        <div className="p-6 bg-blue-300">
          <h2 className="text-3xl font-semibold mb-4">
            Title: {blog.data.title}
          </h2>
          <p className="text-gray-700 leading-relaxed break-words">
            Content: {blog.data.content}
          </p>
          {/* Comments section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p>{comment.text}</p>
                    {/* Add reply button here */}
                    <button
                      className="text-blue-500"
                      onClick={() => handleReply(index)}
                    >
                      Reply
                    </button>
                  </div>
                  {/* Add reply input field here */}
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="ml-8 mt-2">
                      <p>{reply}</p>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
          {/* Comment input field */}
          <div className="mt-6">
            <div className="relative mt-4">
              <textarea
                className="w-full h-20 border border-gray-300 rounded-md p-2 pl-10 resize-none"
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button
                className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-400 hover:text-gray-600"
                onClick={handleCommentSubmit}
              >
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
