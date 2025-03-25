import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import AddPost from "../components/AddPost";

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
      const response = await axios.get(
        "https://adequate-rejoicing-production.up.railway.app/api/posts",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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
        `https://adequate-rejoicing-production.up.railway.app/api/posts/${postId}/${type}`,
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

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post at the top
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex-1 max-w-2xl mx-auto p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">GitConnect Feed</h1>

        <AddPost onPostAdded={handlePostAdded} />

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

export default Dashboard;
