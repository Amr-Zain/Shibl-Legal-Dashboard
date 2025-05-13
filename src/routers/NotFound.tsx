// src/pages/NotFound.tsx
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="animate-pulse">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600">
            The page you're looking for has vanished into the digital void...
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg cursor-pointer transition-colors duration-300 transform hover:scale-105"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-sm font-medium text-white bg-secondary rounded-lg cursor-pointer transition-colors duration-300 transform hover:scale-105"
          >
            🏠 Return Home
          </button>
        </div>

        <div className="mt-12 animate-bounce">
          <span className="text-4xl">🔍</span>
        </div>
      </div>
    </div>
  );
}
