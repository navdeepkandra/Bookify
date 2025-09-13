import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useFirebase } from "../context/Firebase.jsx";

const Profile = () => {
  const firebase = useFirebase();
  const user = firebase.user;

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h3>Please login to view your profile.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "25rem", padding: "20px" }} className="shadow-sm">
        <div className="d-flex flex-column align-items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="bg-secondary rounded-circle mb-3 d-flex justify-content-center align-items-center"
              style={{ width: "100px", height: "100px", fontSize: "2rem", color: "#fff" }}
            >
              {user.email.charAt(0).toUpperCase()}
            </div>
          )}

          <h4 className="mb-1">{user.displayName || "Anonymous"}</h4>
          <p className="text-muted">{user.email}</p>

          {/* <Button
            variant="primary"
            className="mt-3"
            onClick={() => alert("Edit profile functionality coming soon!")}
          >
            Edit Profile
          </Button> */}
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
