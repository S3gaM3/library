// src/pages/Admin.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService.ts';

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Проверяем, является ли текущий пользователь администратором
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Здесь можно добавить проверку роли пользователя (например, через Firestore)
      setIsAdmin(true); // Пока будем считать, что пользователь с email admin@example.com — админ
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">У вас нет доступа к этой панели.</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Панель администратора</h1>
      {/* Здесь будет контент для админа, например, добавление книг */}
    </div>
  );
};

export default Admin;
