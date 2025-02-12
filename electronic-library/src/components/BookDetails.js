import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, Container, Box, CircularProgress } from "@mui/material";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка при загрузке книги:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!book) {
    return (
      <Container>
        <Typography variant="h5" mt={4} color="error">
          Книга не найдена!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} boxShadow={3} borderRadius={2}>
        <Card>
          <CardContent>
            <Typography variant="h5">{book.title}</Typography>
            <Typography variant="body2" mt={2} sx={{ whiteSpace: "pre-wrap" }}>
              {book.text}
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate("/")}>
              Назад к каталогу
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BookDetails;
