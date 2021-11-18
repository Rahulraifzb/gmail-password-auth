import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import AlertComponent from "../../../components/AlertComponent";
import AuthLayout from "../../../layouts/AuthLayout";
import useMounted from "../../../hooks/useMounted";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { forgetPassword } = useAuth();
  const { mounted } = useMounted();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await forgetPassword(emailRef.current.value)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false)
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to forget password");
      })
      .finally(() => {
        mounted && setIsSubmitting(false);
      });
  };

  const closeAlert = () => {
    setError("");
  };

  return (
    <AuthLayout>
      <Card>
        <Card.Body>
          <h2>Forget Password</h2>

          {error && (
            <AlertComponent
              variant="danger"
              content={error}
              closeAlert={closeAlert}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@gmail.com"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        back to login ? <Link to="/register">login</Link>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
