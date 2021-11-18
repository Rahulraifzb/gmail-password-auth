import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { Link, useHistory} from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import {Alert} from "../../../components"
import useMounted from "../../../hooks/useMounted";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const history = useHistory()
  const {mounted} = useMounted()

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not matched!");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to create an account");
    }

    mounted && setLoading(false);
  };

  const closeAlert = () => {
    setError("");
  };

  return (
    <AuthLayout>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4 ">Sign Up</h2>

          {error && (
            <Alert variant="danger" closeAlert={closeAlert} content={error}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="john@gmail.com"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={loading} className="mt-2">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
