import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const userId = localStorage.getItem("userId"); // Get the logged-in user ID
  const token = localStorage.getItem("token"); // Get the stored token
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch profile
  const fetchProfile = () => {
    if (!userId || !token) {
      setError("User not authenticated");
      return;
    }
    axios
      .get(`https://gitconnect-backend.onrender.com/api/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.profile) {
          setProfile(res.data.profile);
          setError(null);
        } else {
          setError("Profile not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Profile not found");
      });
  };

  useEffect(() => {
    fetchProfile();
  }, [userId, token]);

  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
  if (!profile) return <p className="text-center mt-4">Loading profile...</p>;

  // Use GET endpoint for profile image
  const profilePicture = profile.profile_picture
    ? `https://adequate-rejoicing-production.up.railway.app/api/profiles/${userId}/image`
    : "https://www.gravatar.com/avatar/?d=mp"; // default avatar

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden p-6 text-center transition duration-300">
      {/* Profile Image */}
      <img
        src={profilePicture}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-md"
      />

      {/* User Name */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
        {profile.full_name || "No Name"}
      </h2>

      {/* Bio */}
      <p className="text-gray-600 dark:text-gray-400 mt-2 italic">
        {profile.bio || "No bio available"}
      </p>

      {/* GitHub Link (Only if available) */}
      {profile.github && (
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-gray-900 dark:bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
        >
          View GitHub Profile
        </a>
      )}
    </div>
  );
};

export default UserProfile;
