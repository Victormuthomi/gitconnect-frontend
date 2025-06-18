import { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

function Post({ post: initialPost, onReact }) {
  const [post, setPost] = useState(initialPost);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");
  const getUsername = () => localStorage.getItem("username") || "Anonymous";

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://gitconnect-backend.onrender.com/api/posts/${initialPost.id}`,
      );
      setPost(response.data.post);
    } catch (error) {
      console.error("Error fetching post:", error.response?.data || error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://adequate-rejoicing-production.up.railway.app/api/posts/${post.id}/comments`,
      );
      const commentsData = Array.isArray(response.data.comments)
        ? response.data.comments
        : [];
      setComments(
        commentsData.map((cmt) => ({
          content: cmt.content,
          username: cmt.username || "Anonymous",
        })),
      );
    } catch (error) {
      console.error("Error fetching comments:", error.response?.data || error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    const username = getUsername();
    if (!token || !comment.trim()) return;

    try {
      console.log("Submitting comment:", { content: comment });

      const response = await axios.post(
        `https://adequate-rejoicing-production.up.railway.app/api/posts/${post.id}/comments`,
        { content: comment, username },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log("Comment added response:", response.data);

      if (response.data.comment) {
        setComments((prev) => [
          ...prev,
          { content: response.data.comment.content, username },
        ]);
      } else {
        console.error("Unexpected response format:", response.data);
      }

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  };

  // Add onReact logic to handle like/dislike reactions
  const handleReaction = async (reactionType) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      // Adjust the URL based on the reaction type
      const url =
        reactionType === "like"
          ? `https://adequate-rejoicing-production.up.railway.app/api/posts/${post.id}/like`
          : `https://adequate-rejoicing-production.up.railway.app/api/posts/${post.id}/dislike`; // Use a different URL for dislike

      // Send reaction to the backend
      const response = await axios.post(
        url,
        { reaction: reactionType },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Update local state with new like/dislike count
      if (response.data) {
        setPost({
          ...post,
          likes: response.data.likes || post.likes,
          dislikes: response.data.dislikes || post.dislikes,
        });
      }
    } catch (error) {
      console.error("Error reacting to post:", error.response?.data || error);
    }
  };

  // Sorting posts by the number of likes (highest to lowest)
  const sortedPosts = [post].sort((a, b) => b.likes - a.likes); // Sort by likes in descending order

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-300 dark:border-gray-700">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300">
          {post.user?.username?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="ml-3">
          <p className="font-semibold">{post.user?.username || "Unknown"}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-gray-800 dark:text-gray-200">{post.content}</p>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => handleReaction("like")}
          className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 transition cursor-pointer"
        >
          <span>👍</span>
          <span>{post.likes}</span>
        </button>

        <button
          onClick={() => handleReaction("dislike")}
          className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition cursor-pointer"
        >
          <span>👎</span>
          <span>{post.dislikes}</span>
        </button>
      </div>

      {/* Comments Section */}
      <Comment
        comments={comments}
        showAllComments={showAllComments}
        setShowAllComments={setShowAllComments}
      />

      {/* Add Comment Form */}
      <form
        onSubmit={handleCommentSubmit}
        className="flex items-center space-x-2 mt-4"
      >
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Comment
        </button>
      </form>
    </div>
  );
}

export default Post;
