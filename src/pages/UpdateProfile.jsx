import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProfile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    github: "",
  });
  const [error, setError] = useState("");

  // Retrieve userId from localStorage on component mount.
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID not found in local storage.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authorization token found.");
      return;
    }
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      await axios.put(
        `https://gitconnect-backend.onrender.com/api/profiles/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError(err.response?.data?.message || "Profile update failed.");
    }
  };

  if (!userId) {
    return <div>{error || "Loading..."}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center">Update Profile</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 py-3 rounded-lg"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
