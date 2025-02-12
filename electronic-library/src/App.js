import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import AuthContext, { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Электронная библиотека
          </Typography>
          <AuthContext.Consumer>
            {({ user, logout }) =>
              user ? (
                <>
                  <Button color="inherit" component={Link} to="/">Каталог</Button>
                  <Button color="inherit" onClick={logout}>Выйти</Button>
                </>
              ) : (
                <Button color="inherit" component={Link} to="/login">Войти</Button>
              )
            }
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

export default App;
