import { useState } from "react";
import axios from "axios";

function AddPost({ onPostAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");
  const getUser = () => JSON.parse(localStorage.getItem("user")) || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const token = getAuthToken();
    const user = getUser();
    if (!token || !user) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://adequate-rejoicing-production.up.railway.app/api/posts",
        { content },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Ensure the new post has the current user's details
      const newPost = {
        ...response.data.post,
        user: { name: user.name || "Anonymous" },
      };

      setContent("");
      onPostAdded(newPost); // Update posts in Dashboard
    } catch (error) {
      console.error("Error adding post:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 border border-gray-300 dark:border-gray-700"
    >
      <textarea
        className="w-full p-2 mb-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export default AddPost;
