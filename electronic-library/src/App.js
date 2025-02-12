import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthContext from "./context/AuthContext";
import "./styles/main.css"; // Импортируем стили

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Электронная библиотека
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/">Каталог</Button>
              <Button color="inherit" onClick={logout}>Выйти</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Войти</Button>
              <Button color="inherit" component={Link} to="/register">Регистрация</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Добавили маршрут для регистрации */}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
