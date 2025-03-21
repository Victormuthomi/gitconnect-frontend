import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative bg-gray-900">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Connect, Collaborate, Create.
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Join GitConnect, the social hub for developers, built for sharing,
            learning, and networking.
          </p>
          <div className="mt-6">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded-lg text-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="ml-4 px-6 py-3 border border-white rounded-lg text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">Why GitConnect?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">👥 Developer Network</h3>
            <p className="mt-2 text-gray-300">
              Find and connect with developers worldwide.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">🚀 Project Collaboration</h3>
            <p className="mt-2 text-gray-300">
              Work on projects together and grow your skills.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold">📢 Share Your Ideas</h3>
            <p className="mt-2 text-gray-300">
              Post thoughts, articles, and insights with the community.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800 py-16">
        <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-gray-700 p-6 rounded-lg w-full md:w-1/3">
            <p className="italic">"GitConnect helped me find my co-founder!"</p>
            <span className="block mt-2 font-semibold">- Jane Doe</span>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg w-full md:w-1/3">
            <p className="italic">"Great for networking and learning!"</p>
            <span className="block mt-2 font-semibold">- John Smith</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; 2025 GitConnect. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/terms" className="hover:underline mx-2">
            Terms
          </Link>
          <Link to="/privacy" className="hover:underline mx-2">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
