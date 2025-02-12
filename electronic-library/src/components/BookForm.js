import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "books", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setTitle(docSnap.data().title);
            setAuthor(docSnap.data().author);
          }
        } catch (error) {
          console.error("Ошибка при загрузке книги:", error);
        }
        setLoading(false);
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      try {
        if (id) {
          await updateDoc(doc(db, "books", id), { title, author });
          setSuccessMessage("Книга успешно обновлена!");
        } else {
          await addDoc(collection(db, "books"), { title, author });
          setSuccessMessage("Книга добавлена!");
        }
        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} boxShadow={3} borderRadius={2}>
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        <Typography variant="h5" mb={2}>{id ? "Редактировать книгу" : "Добавить книгу"}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Название книги"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Автор"
            variant="outlined"
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {id ? "Сохранить изменения" : "Добавить книгу"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookForm;
