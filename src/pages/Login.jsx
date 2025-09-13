import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await firebase.signInUserWithEmailAndPassword(email, password);
      navigate("/"); // Redirect home after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
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

        <Button variant="primary" type="submit">
          Login
        </Button>
        <h1 className="mt-5 mb-5">OR</h1>
        <Button onClick={firebase.signInWithGoogle} variant="danger">
          Signin with Google
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
