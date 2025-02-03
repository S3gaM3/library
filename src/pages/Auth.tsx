// src/pages/Auth.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmailPassword, loginWithEmailPassword } from '../services/authService.ts';  // Исправьте импорты



const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Флаг для переключения между входом и регистрацией
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginWithEmailPassword(email, password);
      } else {
        await registerWithEmailPassword(email, password);
      }
      navigate('/');
    } catch (error) {
      console.error('Ошибка аутентификации', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="btn-primary">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500">
        {isLogin ? 'Создать новый аккаунт' : 'Уже есть аккаунт?'}
      </button>
    </div>
  );
};

export default Auth;
