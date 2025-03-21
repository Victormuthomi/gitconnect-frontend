import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://172.18.0.3:8080/api/auth/login",
        formData,
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 py-3 rounded-lg"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
