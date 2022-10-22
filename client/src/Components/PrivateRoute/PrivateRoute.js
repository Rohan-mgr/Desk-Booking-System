import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  if (true) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
