import React, { useState } from "react";

const Blog = ({ title, content, imageUrl }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

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
    setReplyIndex(index);
    setReplyText("");
  };

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[replyIndex].replies.push(replyText);
      setComments(updatedComments);
      setReplyIndex(null);
      setReplyText("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 w-[90%]">
      <div className="border border-gray-50 max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <img
          src={imageUrl}
          alt="Blog Post Image"
          className="w-full h-[300px] object-contain"
        />
        <div className="p-6 bg-blue-300">
          <h2 className="text-3xl font-semibold mb-4">Title: {title}</h2>
          <p className="text-gray-700 leading-relaxed break-words">
            Content: {content}
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p>{comment.text} sdfaf</p>
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
                    {comment.replies.map((reply, replyIndex) => (
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
                value={comment}
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
        <div className=" text-center m-1  bg-red-300">read more</div>
      </div>
    </div>
  );
};

export default Blog;
