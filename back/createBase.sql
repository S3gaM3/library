-- Создание базы данных (если её нет)
CREATE DATABASE IF NOT EXISTS electronic_library CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE electronic_library;

-- Таблица авторов (опционально, если в будущем захотите добавить авторов)
CREATE TABLE IF NOT EXISTS authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Таблица жанров (опционально, если захотите сортировать книги по жанрам)
CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Таблица книг
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text LONGTEXT NOT NULL, -- Полный текст книги
    author_id INT DEFAULT NULL, -- Автор (необязательно)
    genre_id INT DEFAULT NULL, -- Жанр (необязательно)
    language VARCHAR(10) DEFAULT 'unknown', -- Язык книги (по умолчанию неизвестен)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE SET NULL
);

-- Вывод списка таблиц (чтобы убедиться, что они создались)
SHOW TABLES;
