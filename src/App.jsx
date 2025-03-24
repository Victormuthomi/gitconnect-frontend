import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthContext provider
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage"; // Import LandingPage
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Footer from "./components/Footer";
import AllProfiles from "./pages/AllProfiles";
import UserProfile from "./pages/UserProfile";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar /> {/* Sidebar is now always visible */}
        <div className="flex-1 ml-16">
          <Routes>
            {/* LandingPage should be open to everyone, but redirect if logged in */}
            <Route
              path="/"
              element={
                // Redirect to Dashboard if the user is logged in
                localStorage.getItem("token") ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LandingPage />
                )
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public Route */}
            <Route path="/profiles" element={<AllProfiles />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/edit" element={<UpdateProfile />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
