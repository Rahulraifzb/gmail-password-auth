import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Home = React.lazy(() => import("./views/pages/Home"));
const Profile = React.lazy(() => import("./views/pages/Profile"));
const UpdateProfile = React.lazy(() => import("./views/pages/UpdateProfile"));
const Error = React.lazy(() => import("./views/pages/Error404"));
const Register = React.lazy(() =>
  import("./views/pages/authentication/Register")
);
const Login = React.lazy(() => import("./views/pages/authentication/Login"));
const ForgetPassword = React.lazy(() => import("./views/pages/authentication/ForgetPassword"))
const RequestForgetPassword = React.lazy(() => import("./views/pages/authentication/RequestForgetPassword"))


export default function AppRouter() {
  return (
    <Suspense fallback={<h4>Loading...</h4>}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/login" component={Login} />
          <ProtectedRoute path="/register" component={Register} />
          <ProtectedRoute path="/forget-password" component={RequestForgetPassword} />
          <ProtectedRoute path="/reset-password" component={ForgetPassword} />
          <ProtectedRoute path="/register" component={Register} />
          <ProtectedRoute path="/register" component={Register} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/update-profile" component={UpdateProfile} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </Suspense>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  console.log("path", path);
  const location = useLocation();
  console.log("location state", location.state);

  if (path === "/login" || path === "/register" || path === "/forget-password" || path === "/reset-password") {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/profile"} />
    ) : (
      <Route {...props} />
    );
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}
