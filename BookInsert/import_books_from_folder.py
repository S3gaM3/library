import os
import mysql.connector
import chardet
import fitz  # PyMuPDF для PDF
import ebooklib
from ebooklib import epub

# 🔹 Настройки подключения к MySQL
DB_CONFIG = {
    "host": "localhost",
    "user": "root",  # Измените, если у вас другой пользователь
    "password": "root",  # Укажите ваш пароль
    "database": "electronic_library"
}

# 🔹 Папка с книгами (измените путь!)
BOOKS_FOLDER = r"C:\Users\Sega\Documents\GitHub\library\books"

# 🔹 Функция подключения к MySQL
def connect_db():
    try:
        db = mysql.connector.connect(**DB_CONFIG)
        return db
    except mysql.connector.Error as err:
        print(f"❌ Ошибка подключения к MySQL: {err}")
        exit(1)

# 🔹 Функция определения кодировки файла
def detect_encoding(file_path):
    with open(file_path, "rb") as f:
        raw_data = f.read(10000)
    result = chardet.detect(raw_data)
    return result["encoding"] or "utf-8"

# 🔹 Функция чтения TXT файла
def read_txt(file_path):
    try:
        encoding = detect_encoding(file_path)
        with open(file_path, "r", encoding=encoding, errors="ignore") as f:
            text = f.read()
        return text.strip()  # Убираем лишние пробелы
    except Exception as e:
        print(f"❌ Ошибка чтения TXT файла {file_path}: {e}")
        return ""

# 🔹 Функция чтения PDF файла
def read_pdf(file_path):
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()
        return text.strip()
    except Exception as e:
        print(f"❌ Ошибка чтения PDF {file_path}: {e}")
        return ""

# 🔹 Функция чтения EPUB файла
def read_epub(file_path):
    text = ""
    try:
        book = epub.read_epub(file_path)
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                text += item.get_content().decode("utf-8") + "\n"
        return text.strip()
    except Exception as e:
        print(f"❌ Ошибка чтения EPUB {file_path}: {e}")
        return ""

# 🔹 Функция добавления книги в БД (ТОЛЬКО название и текст)
def insert_book(title, text):
    if not text.strip():
        print(f"⚠ Пропуск: '{title}' (нет содержимого)")
        return

    db = connect_db()
    cursor = db.cursor()
    try:
        sql = "INSERT INTO books (title, text) VALUES (%s, %s)"
        cursor.execute(sql, (title, text))
        db.commit()
        print(f"✅ Книга '{title}' добавлена в базу данных!")
    except mysql.connector.Error as err:
        print(f"❌ Ошибка при добавлении книги {title}: {err}")
    finally:
        cursor.close()
        db.close()

# 🔹 Функция обработки всех файлов в папке
def process_books():
    if not os.path.exists(BOOKS_FOLDER):
        print(f"❌ Папка {BOOKS_FOLDER} не найдена!")
        exit(1)

    files = os.listdir(BOOKS_FOLDER)
    if not files:
        print("❌ Папка пуста, книг нет.")
        exit(1)

    for file_name in files:
        file_path = os.path.join(BOOKS_FOLDER, file_name)

        if not os.path.isfile(file_path):
            continue

        # Определяем название книги (без расширения)
        title, ext = os.path.splitext(file_name)

        text = ""
        if ext.lower() == ".txt":
            text = read_txt(file_path)
        elif ext.lower() == ".pdf":
            text = read_pdf(file_path)
        elif ext.lower() == ".epub":
            text = read_epub(file_path)

        if text:
            insert_book(title, text)
        else:
            print(f"⚠ Книга {title} не добавлена (нет текста)")

# 🔹 Запускаем процесс загрузки
if __name__ == "__main__":
    print("📚 Запуск импорта книг...")
    process_books()
    print("🎉 Все книги успешно добавлены в базу данных!")
