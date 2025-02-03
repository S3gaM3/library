import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithEmailPassword, registerWithEmailPassword } from '../services/authService.ts';
import { setUser } from '../features/authSlice.ts';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Переключаемся между регистрацией и входом
  const [error, setError] = useState(''); // Для хранения ошибки

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const user = await loginWithEmailPassword(email, password); // Вход
        // Обновление Redux состояния после успешного входа
        dispatch(setUser({
          email: user.email,
          uid: user.uid,
          role: 'user', // Предполагается, что роль "user" по умолчанию, это можно доработать
        }));
        navigate('/'); // Переход на главную страницу
      } else {
        const user = await registerWithEmailPassword(email, password); // Регистрация
        // Обновление Redux состояния после успешной регистрации
        dispatch(setUser({
          email: user.email,
          uid: user.uid,
          role: 'user', // По умолчанию роль пользователя
        }));
        navigate('/'); // Переход на главную страницу после успешной регистрации
      }
    } catch (error: any) {
      setError('Authentication failed: ' + error.message); // Отображение ошибки
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибку */}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default Login;
