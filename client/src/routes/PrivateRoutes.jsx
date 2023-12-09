import { PropTypes } from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider.jsx";
import Loading from "../components/Loading/Loading";
import sweetAlertController from "../utils/sweetAlertController.js";

const PrivateRoutes = ({ children }) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  //console.log(user);
  //console.log("children: -", children);

  const alertBeforeRedirect = () => {
    setLoading(false);
    sweetAlertController(
      "Error!",
      "You have to log in first to view details",
      "error",
      "Close"
    );
  };

  if (user) {
    return children;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {alertBeforeRedirect()}
      <Navigate state={location.pathname} to='/login' />;
    </div>
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;
