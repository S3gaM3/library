import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";


const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Ошибка входа. Проверьте данные.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} className="container">
        <Typography variant="h5" mb={2}>
          Вход в систему
        </Typography>
        {error && <Alert severity="error" className="alert-error">{error}</Alert>}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Войти
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
