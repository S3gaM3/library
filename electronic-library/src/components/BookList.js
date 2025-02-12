import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { FaBook } from "react-icons/fa";


const BookList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/api/books")
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка загрузки книг:", error);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container">
      <h2>📚 Электронная библиотека</h2>

      {loading && <div className="loading"><CircularProgress /></div>}

      {books.length === 0 && !loading && (
        <p className="text-center text-red-500">Нет доступных книг.</p>
      )}

      {/* Сетка карточек */}
      <div className="grid">
        {books.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: 1 }}
            onClick={() => navigate(`/book/${book.id}`)}
            className="card"
          >
            <div className="flex items-center justify-between">
              <FaBook className="icon" />
              <span className="text-sm text-gray-500">
                {Math.floor(Math.random() * 500) + 100} стр.
              </span>
            </div>
            <h3>{book.title}</h3>
            <p className="text-gray-500 text-sm italic">Жанр: Художественная литература</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
