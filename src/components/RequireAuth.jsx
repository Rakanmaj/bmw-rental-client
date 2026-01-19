import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
     alert("Please login to continue your reservation");
    return <Navigate to="/auth" replace />;
  
  }

  return children;
}

export default RequireAuth;
