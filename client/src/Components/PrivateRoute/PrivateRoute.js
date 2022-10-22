import { Navigate } from "react-router-dom";
import { _getSecureLs } from "../../helper/storage";

function PrivateRoute({ children }) {
  const { isLoggedIn } = _getSecureLs("auth");
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
