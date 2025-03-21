import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const getAuthToken = () => localStorage.getItem("token");

  const fetchPosts = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.get("http://172.18.0.3:8080/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(Array.isArray(response.data.posts) ? response.data.posts : []);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error);
      setPosts([]);
    }
  };

  const handleReaction = async (postId, type) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.post(
        `http://172.18.0.3:8080/api/posts/${postId}/${type}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error(`Error updating ${type}:`, error.response?.data || error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />

      <div className="flex-1 max-w-2xl mx-auto p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">GitConnect Feed</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No posts yet. Be the first to post!
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} onReact={handleReaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Post({ post, onReact }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");
  const getUsername = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.name || "Anonymous";
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://172.18.0.3:8080/api/posts/${post.id}/comments`,
      );
      const commentsData = Array.isArray(response.data.comments)
        ? response.data.comments
        : [];

      setComments(
        commentsData.map((cmt) => ({
          content: cmt.content,
          username: cmt.name || "Anonymous",
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
        `http://172.18.0.3:8080/api/posts/${post.id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log("Comment added response:", response.data);

      if (response.data.comment) {
        setComments((prev) => [
          ...prev,
          {
            content: response.data.comment.content,
            username: username,
          },
        ]);
      } else {
        console.error("Unexpected response format:", response.data);
      }

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-300 dark:border-gray-700">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300">
          {post.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="ml-3">
          <p className="font-semibold">{post.user?.name || "Unknown"}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-1">{post.title}</h2>
      <p className="text-gray-800 dark:text-gray-200">{post.content}</p>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => onReact(post.id, "like")}
          className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-500 transition"
        >
          <span>👍</span>
          <span>{post.likes}</span>
        </button>

        <button
          onClick={() => onReact(post.id, "dislike")}
          className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 transition"
        >
          <span>👎</span>
          <span>{post.dislikes}</span>
        </button>
      </div>

      <div className="mt-4">
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center space-x-2"
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

        {comments.length > 0 && (
          <div className="mt-2">
            {comments
              .slice(0, showAllComments ? comments.length : 1)
              .map((cmt, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 mt-1"
                >
                  <strong>{cmt.username}:</strong> {cmt.content}
                </p>
              ))}

            {comments.length > 1 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="text-blue-500 text-sm mt-2"
              >
                Show more comments ({comments.length - 1} more)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
