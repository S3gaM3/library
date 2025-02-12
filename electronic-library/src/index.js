import React from "react";
import ReactDOM from "react-dom/client";  // Используйте ReactDOM.createRoot из 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // Импортируем AuthProvider
import App from "./App";

// Создаем корневой элемент
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>  {/* Оборачиваем в AuthProvider */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
