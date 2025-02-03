import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home.tsx';
import BookDetail from './pages/BookDetail.tsx';
import Login from './components/Login.tsx';
import Favorites from './pages/Favorites.tsx';
import Admin from './pages/Admin.tsx';  // Панель администратора
import { RootState } from './store/store.ts';
import BookReader from './components/BookReader.tsx';

const AppRoutes = () => {
  // Получаем пользователя из Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  // Компонент для защиты маршрута (требует аутентификацию)
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />; // Перенаправление на страницу входа, если пользователь не авторизован
    }
    return <>{children}</>;
  };

  // Компонент для защиты маршрута для администраторов
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/" replace />; // Перенаправление на главную страницу, если пользователь не администратор
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        {/* Главная страница или панель администратора */}
        <Route path="/" element={user ? (user.role === 'admin' ? <Admin /> : <Home />) : <Navigate to="/login" />} />
        
        {/* Страница книги */}
        <Route path="/book/:id" element={<BookDetail />} />
        
        {/* Страница избранных книг, доступная только для авторизованных пользователей */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        
        {/* Страница входа */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        
        {/* Панель администратора, доступная только для администраторов */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        
        <Route path="/book/:id/reader" element={<BookReader />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
