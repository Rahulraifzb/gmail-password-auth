import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";
import AlertComponent from "../../components/AlertComponent";
import useMounted from "../../hooks/useMounted";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const history = useHistory();
  const { mounted } = useMounted();

  console.log(currentUser)

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("form btn clicked");

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Password do not matched!");
    }

    const promises = [];
    setIsSubmitting(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    await Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error)
        setError("Failed to update account");
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
          <h4>Update Profile</h4>
          {error && (
            <AlertComponent
              closeAlert={closeAlert}
              content={error}
              variant="danger"
            />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@gmail.com"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep the same"
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirm-password">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep the same"
                ref={confirmPasswordRef}
              />
            </Form.Group>
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </AuthLayout>
  );
};

export default UpdateProfile;
