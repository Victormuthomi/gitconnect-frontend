import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get("https://gitconnect-backend.onrender.com/api/profiles")
      .then((res) => setProfiles(res.data.profiles))
      .catch((err) => console.error(err));
  }, []);

  const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp"; // Replace with custom default avatar

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        All Profiles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {profiles.length > 0 ? (
          profiles.map((profile) => {
            const profilePicture = profile.profile_picture
              ? `https://adequate-rejoicing-production.up.railway.app/api/${profile.profile_picture}`
              : defaultAvatar;

            return (
              <div
                key={profile.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-4 text-center">
                  {/* Profile Image */}
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-28 h-28 mx-auto rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
                    {profile.full_name || "No Name"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {profile.bio || "No bio available"}
                  </p>
                  {/* GitHub Link (Only if available) */}
                  {profile.github && (
                    <div className="mt-4">
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition duration-300"
                      >
                        View GitHub Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No profiles available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProfiles;
