import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from "@mui/material";

const BookList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Если нет пользователя, перенаправляем на страницу входа
      return;
    }

    axios.get("http://localhost:5000/api/books")
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка при загрузке книг:", error);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user) return null; // Если нет пользователя, ничего не показываем

  return (
    <Grid container spacing={3} mt={2}>
      {loading && <CircularProgress sx={{ margin: "20px auto" }} />}

      {books.length === 0 && !loading && (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          Нет доступных книг.
        </Typography>
      )}

      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Button component={Link} to={`/book/${book.id}`} variant="contained" color="primary" sx={{ mt: 2 }}>
                Читать
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
