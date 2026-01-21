import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("**Required**"),
  password: Yup.string().required("**Required**").max(12),
});

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();
  const { login, logout } = useContext(ActiveUserContext);

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = (values: { email: string; password: string }) => {
    login(values.email.toLowerCase(), values.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (
          (error.response !== "undefined" &&
            error.response.status === 401) ||
          error.response.status === 403
        ) {
          alert("invalid login");
        } else {
          alert("login Error");
        }
      });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <h2>Sign In</h2>
          <p>Default login:</p>
          <p>email: admin@example.com</p>
          <p>pw: 1234</p>
        </Grid>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          isInitialValid
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <TextField
                label="email"
                id="email"
                name="email"
                placeholder="Enter username"
                fullWidth
                required
                autoFocus
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
              />
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}

              <TextField
                id="password"
                label="password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}

              <Button
                type="submit"
                color="primary"
                name="submit"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you need a new account ?<Link href="/registration">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
