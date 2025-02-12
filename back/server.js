require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Настройки подключения к MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Укажите своего пользователя
  password: "root", // Укажите пароль MySQL
  database: "electronic_library",
});

// 🔹 Подключение к базе данных
db.connect((err) => {
  if (err) {
    console.error("❌ Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("✅ Подключено к MySQL!");
});

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Получить все книги
app.get("/api/books", (req, res) => {
  db.query("SELECT id, title FROM books", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// 🔹 Получить книгу по ID
app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT title, text FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ message: "Книга не найдена" });
    } else {
      res.json(result[0]);
    }
  });
});

// 🔹 Добавить книгу
app.post("/api/books", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ message: "Название и текст обязательны" });
  }
  db.query("INSERT INTO books (title, text) VALUES (?, ?)", [title, text], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: result.insertId, title, text });
    }
  });
});

// 🔹 Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
