import { useNavigate } from "react-router-dom";

import { logInWithEmailAndPassword } from "../backend/FirebaseHooks";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    logInWithEmailAndPassword(data.get("email"), data.get("password")).then(
      () => navigate("/home")
    );
  };

  return (
    <Box align="center">
      <Box height="15vh" />
      <Box
        sx={{
          align: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "40vw",
          height: "60vh",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
