import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx";
import Spinner from "react-bootstrap/Spinner";

const Logout = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await firebase.signOutUser();
        navigate("/login"); // redirect to login page
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

    logoutUser();
  }, [firebase, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Spinner animation="border" variant="primary" />
      <span className="ms-2">Logging out...</span>
    </div>
  );
};

export default Logout;
