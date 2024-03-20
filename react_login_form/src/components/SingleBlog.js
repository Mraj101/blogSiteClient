import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await axios.get(
          `http://localhost:8000/api/v1/blogs/getSingle/${id}`
        );
        setBlog(blogResponse.data);

        const commentsResponse = await axios.get(
          `http://localhost:8000/api/v1/comments/getComments/${id}`
        );

        // setComments((prev) => [...prev, ...commentsResponse.data.data]);
        setComments(commentsResponse.data.data)

        // console.log(commentsResponse.data.data[0], "response comment");
        // console.log(blogResponse, "the response");
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, []);

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  // const handleCommentSubmit = async() => {
  //   if (commentInput.trim() !== "") {
  //     const newComment = { comment: commentInput, replies: [] };
  //     setComments([newComment, ...comments]);
  //     const response = await axios.post('http://localhost:8000/api/v1/comments/crt', newComment);
  //     setCommentInput("");
  //     console.log(comments,"new comment data");
  //   }
  // };

  // const handleCommentSubmit = async () => {
  //   try {
  //     if (commentInput.trim() !== "") {
  //       const commentData = {
  //         blogId:`${id}`,
  //         comment: commentInput,
  //         replies:[]
  //       };

  //       const response = await axios.post('http://localhost:8000/api/v1/comments/crt', commentData);

  //       const newComment = {
  //         comment: response.data.data.comments,
  //         replies: []
  //       };

  //       setComments([newComment, ...comments]);
  //       setCommentInput(""); // Clearing the comment input after submission
  //     }
  //   } catch (error) {
  //     console.error("Error creating comment:", error);
  //   }
  // };

  const handleCommentSubmit = async () => {
    try {
      //console.log(comments);
      if (commentInput.trim() !== "") {
        const commentData = {
          blogId: id,
          comment: commentInput,
          replies: [],
        };

        const response = await axios.post(
          "http://localhost:8000/api/v1/comments/crt",
          commentData
        );
        setComments((prev) => [...prev, response.data.data]);
        setCommentInput("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleReply = (index) => {
    setReplyIndex(index);
    setReplyText("");
  };


  const handleReplySubmit = async () => {
    console.log("heelo reply")
    if (replyText.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[replyIndex].replies.push(replyText);
      try {   
        const response = await axios.put(
          `http://localhost:8000/api/v1/comments/update/${id}`,
          updatedComments
        );
      } catch (error) {
        console.log(error,"there was a problem updating the comments");
      }

      setComments(updatedComments);
      setReplyIndex(null);
      setReplyText("");
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }
  console.log(comments, "mp comments");
  return (
    <div className="container mx-auto px-4 py-8 w-[80%] bg-gray-100">
      <div className="border border-gray-50 max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden m-4 bg-gray-50">
        <img
          src={blog.data.img}
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
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p className="text-black">{comment.comment}</p>
                    <button
                      className="text-blue-500"
                      onClick={() => handleReply(index)}
                    >
                      Reply
                    </button>
                  </div>
                  {replyIndex === index && (
                    <div className="ml-8 mt-2">
                      <textarea
                        className="w-full border border-gray-300 rounded-md p-1 resize-none"
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      ></textarea>
                      <button
                        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                        onClick={handleReplySubmit}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  <ul>
                    {comments.replies &&
                      comments.replies.map((reply, replyIndex) => (
                        <li key={replyIndex} className="text-gray-500 ml-6">
                          {reply}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <div className="relative mt-4">
              <textarea
                className="w-full h-20 border border-gray-300 rounded-md p-2 pl-10 resize-none"
                placeholder="Write your comment..."
                value={commentInput}
                onChange={handleCommentChange}
              ></textarea>
              <button
                className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-400 hover:text-gray-600"
                onClick={handleCommentSubmit}
              >
                <svg
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
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
