import { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const userId = 1; // Replace with logged-in user's ID
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    github: "",
  });
  const [loading, setLoading] = useState(true); // Handle loading state

  // Function to fetch profile data
  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(
          `https://adequate-rejoicing-production.up.railway.app/api/profiles/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          setProfile(res.data);
          setFormData({
            full_name: res.data.full_name || "",
            bio: res.data.bio || "",
            github: res.data.github || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profile data:", err);
          setLoading(false);
        });
    } else {
      console.log("No authorization token found.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await axios.put(
          `https://adequate-rejoicing-production.up.railway.app/api/profiles/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        alert("Profile updated!");
      } catch (error) {
        console.error("Update failed", error);
        alert("Failed to update profile");
      }
    } else {
      alert("No authorization token found.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Update Profile</h2>

      <form onSubmit={handleUpdateProfile} className="mt-4">
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="block w-full p-2 border rounded mt-2"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="block w-full p-2 border rounded mt-2"
        />
        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="GitHub Link"
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
