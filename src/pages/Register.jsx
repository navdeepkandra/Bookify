import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await firebase.signUpUserWithEmailAndPassword(email, password);

      await updateProfile(res.user, {
        displayName: fullName, 
        photoURL: `https://ui-avatars.com/api/?name=${fullName}&background=random`
      });

      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
