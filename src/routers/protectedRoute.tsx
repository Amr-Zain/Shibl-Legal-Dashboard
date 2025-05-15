import { AuthContext } from "@/context/AuthProvider";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";

const PrivateRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext)!;
  const location = useLocation();
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  if (!currentUser)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
