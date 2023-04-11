import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import validator from "validator";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { regexPassword } from "../../utils";
import { Stack } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(201 160 155)",
    },
  },
});

export default function LoginForm(props) {
  const navigate = useNavigate();
  const BASE_HOST = process.env.REACT_APP_BASE_HOST;
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
    showRepeatPassword: false,
  });
  const [errors, setErrors] = React.useState({
    email: false,
    password: false,
    repeatPassword: false,
    fetchError: false,
    fetchErrorMsg: "",
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    switch (fieldName) {
      case "email":
        validator.isEmail(currValue)
          ? setErrors({ ...errors, email: false })
          : setErrors({ ...errors, email: true });
        break;

      case "password":
        regexPassword.test(currValue)
          ? setErrors({ ...errors, password: false })
          : setErrors({ ...errors, password: true });
        break;

      case "repeatPassword":
        currValue === values.password
          ? setErrors({ ...errors, repeatPassword: false })
          : setErrors({ ...errors, repeatPassword: true });
        break;
      default:
        break;
    }
    setValues({ ...values, [fieldName]: event.target.value });
  };
  const handleSubmit = (event) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    event.preventDefault();

    fetch(BASE_HOST + "/auth/login", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {
        // if (!user) {
        //   setErrors({ ...errors, email: true });
        // }
        const user = {
          name: res.user.name,
          phone: res.user.phone,
          avatar: res.user.avatar,
          dir: res.user.dir,
          email: res.user.email,
          admin: res.user.admin,
        };
        localStorage.setItem("token", res.user.token);
        localStorage.setItem("uuid", res.user.uuid);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.reload();

        navigate("/");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="logreg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Stack noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    error={errors.email}
                    helperText={
                      errors.email && "Por favor inserte un email válido"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    error={errors.password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ color: "white" }}
              >
                Log in
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    onClick={props.onSwitchComponent}
                    variant="body2"
                    marginBottom="20px"
                    style={{ color: "rgb(201 160 155)" }}
                  >
                    No tenes una cuenta?? Registrate
                  </Link>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
