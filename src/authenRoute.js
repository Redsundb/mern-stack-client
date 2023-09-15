
import { Navigate } from "react-router-dom";
import { getUser } from "./services/authorize";

const ProtectedRoute = ({children}) => {
  const auth  = getUser();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;