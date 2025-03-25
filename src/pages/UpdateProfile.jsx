import { useState } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const userId = 1; // Replace with the logged-in user's ID
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    github: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Only POST request is used for now (no GET or PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `https://adequate-rejoicing-production.up.railway.app/api/profiles`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      setError("Update failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Update Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="block w-full p-2 border rounded mt-2"
          required
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="block w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={formData.github}
          onChange={handleChange}
          className="block w-full p-2 border rounded mt-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;

