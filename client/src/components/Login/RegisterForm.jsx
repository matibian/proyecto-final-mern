import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(201 160 155)",
    },
  },
});

export default function RegisterForm(props) {
  const BASE_HOST = process.env.REACT_APP_BASE_HOST;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      dir: data.get("dir"),
      age: data.get("age"),
      phone: data.get("phone"),
      avatar: data.get("avatar"),
    };

    fetch(BASE_HOST + "/auth/signup", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(user), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => {
        const user = {
          avatar: res.avatar,
          dir: res.dir,
          email: res.email,
          name: res.name,
          phone: res.phone,
        };
        console.log(user);
        localStorage.setItem("token", res.token);
        localStorage.setItem("uuid", res.uuid);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.reload();
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Edad"
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dir"
                  label="Dirección"
                  name="dir"
                  autoComplete="adress"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Telefono"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="avatar"
                  label="Avatar"
                  name="avatar"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  onClick={props.onSwitchComponent}
                  variant="body2"
                  marginBottom="20px"
                  style={{ color: "rgb(201 160 155)" }}
                >
                  Ya tenes una cuenta?? Entrá
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
