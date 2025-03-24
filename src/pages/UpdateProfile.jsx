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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage (corrected key)
    if (token) {
      axios
        .get(`http://172.18.0.3:8080/api/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        })
        .then((res) => {
          setProfile(res.data);
          setFormData({
            full_name: res.data.full_name || "",
            bio: res.data.bio || "",
            github: res.data.github || "",
          });
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((err) => {
          console.error("Error fetching profile data:", err);
          setLoading(false); // Set loading to false even if there's an error
        });
    } else {
      console.log("No authorization token found.");
      setLoading(false);
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage (corrected key)

    if (token) {
      try {
        await axios.put(
          `http://172.18.0.3:8080/api/profiles/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the request header
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

  const handleImageUpload = async () => {
    if (!image) return;

    const formDataImage = new FormData();
    formDataImage.append("profile_picture", image);
    const token = localStorage.getItem("token"); // Get token from localStorage (corrected key)

    if (token) {
      try {
        const res = await axios.post(
          `http://172.18.0.3:8080/api/profiles/${userId}/upload`,
          formDataImage,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request header
            },
          },
        );
        alert("Profile picture updated!");
        setProfile({ ...profile, profile_picture: res.data.profile_picture });
      } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to upload image");
      }
    } else {
      alert("No authorization token found.");
    }
  };

  // Show loading state or the profile form
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Update Profile</h2>

      {profile.profile_picture && (
        <div className="mt-4 text-center">
          <img
            src={`http://172.18.0.3:8080/${profile.profile_picture}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>
      )}

      <div className="mt-4 text-center">
        <input type="file" onChange={handleFileChange} className="mt-4" />
        <button
          onClick={handleImageUpload}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        >
          Upload Image
        </button>
      </div>

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
