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

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("**Required**").min(2).max(50),
  lastName: Yup.string().required("**Required**").min(2).max(50),
  email: Yup.string().email().required("**Required**"),
  password: Yup.string()
    .required("**Required**")
    .max(12)
    .matches(passwordRules, {
      message:
        "Your password must be at least 5 characters long and include an uppercase letter (A-Z), a lowercase letter(a-z), and a number (0-9).",
    }),
  passwordConfirmation: Yup.string()
    .required("**Required**")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Registration = () => {
  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();
  const { register, logout } = useContext(ActiveUserContext);

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    register(
      values.firstName.trim(),
      values.lastName.trim(),
      values.email.toLowerCase(),
      values.password.trim()
    )
      .then(() => {
        navigate("/user");
      })
      .catch((error) => {
        if (
          (error.response !== "undefined" &&
            error.response.status === 401) ||
          error.response.status === 403
        ) {
          alert("invalid registration");
        } else {
          alert("registration Error");
        }
      });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <h2>Sign Up</h2>
        </Grid>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          isInitialValid
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <TextField
                label="first name"
                id="firstName"
                placeholder="Enter first name"
                fullWidth
                required
                autoFocus
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.firstName}
              />
              {props.errors.firstName && (
                <div id="feedback">{props.errors.firstName}</div>
              )}

              <TextField
                label="last name"
                id="lastName"
                placeholder="Enter last name"
                fullWidth
                required
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastName}
              />
              {props.errors.lastName && (
                <div id="feedback">{props.errors.lastName}</div>
              )}

              <TextField
                label="email"
                id="email"
                placeholder="Enter email"
                fullWidth
                required
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

              <TextField
                id="passwordConfirmation"
                label="password confirmation"
                placeholder="Enter password confirmation"
                type="password"
                fullWidth
                required
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.passwordConfirmation}
              />

              {props.errors.passwordConfirmation && (
                <div id="feedback">{props.errors.passwordConfirmation}</div>
              )}

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          {" "}
          Do you already have an account ?<Link href="/login">Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Registration;
