import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import { Alert } from "../../../components";
import useMounted from "../../../hooks/useMounted";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWithGoogle,signInWithFacebook ,signInWithGithub} = useAuth();
  const history = useHistory();
  const location = useLocation();

  const { mounted } = useMounted();

  const handleRedirectToOrBack = () => {
    history.replace(location.state?.from ?? "/profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value)
        .then((res) => {
          handleRedirectToOrBack();
        })
        .catch((error) => {
          setError("Failed to log in ");
          setLoading(false);
        });
    } catch (error) {
      setError("Failed to log in ");
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
          <h2 className="text-center mb-4 ">Sign In</h2>

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
            <Button type="submit" disabled={loading} className="mt-2">
              Sign In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forget-password">Forgot Password</Link>
          </div>

          <div className="d-flex align-items-center justify-content-center flex-column">
            <div>
              <h5>or</h5>
            </div>
            <div>
            <Button
              type="button"
              outline
              className="btn-block"
              onClick={() => {
                signInWithGoogle()
                  .then((user) => {
                    handleRedirectToOrBack();
                    console.log(user);
                  })
                  .catch((e) => console.log(e.message));
              }}
            >
              Sign in with Google{" "}
            </Button>
            </div>
            <div className="mt-2">
            <Button
              type="button"
              outline
              className="btn-block"
              onClick={() => {
                signInWithFacebook()
                  .then((user) => {
                    handleRedirectToOrBack();
                    console.log(user);
                  })
                  .catch((e) => console.log(e.message));
              }}
            >
              Sign in with Facebook{" "}
            </Button>
            </div>
            <div className="mt-2">
            <Button
              type="button"
              outline
              className="btn-block"
              onClick={() => {
                signInWithGithub()
                  .then((user) => {
                    handleRedirectToOrBack();
                    console.log(user);
                  })
                  .catch((e) => console.log(e.message));
              }}
            >
              Sign in with Github{" "}
            </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Register</Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
