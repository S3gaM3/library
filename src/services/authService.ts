// services/authService.ts
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { store } from '../store/store.ts';
import { setUser, clearUser } from '../features/authSlice.ts';

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBn7_raOuwU-lKboEEenlO939q8YhiEEb8',
  authDomain: 'library-a7a92.firebaseapp.com',
  projectId: 'library-a7a92',
  storageBucket: 'library-a7a92.firebasestorage.app',
  messagingSenderId: '655110121434',
  appId: '1:655110121434:web:f2c0dd9906f43be0d7c2e3',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Регистрация нового пользователя
export const registerWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Проверка на наличие email и uid
    if (!user.email || !user.uid) {
      throw new Error('Ошибка регистрации, нет данных пользователя.');
    }

    // Предположим, что роль устанавливается на основе метаданных Firebase или по умолчанию как 'user'
    const userData = {
      email: user.email,
      uid: user.uid,
      role: 'user', // Указываем роль как 'user'
    };

    // Сохраняем пользователя в Redux
    store.dispatch(setUser(userData));
    return user;
  } catch (error) {
    console.error('Error registering:', error.message);
    throw error;
  }
};

// Вход пользователя с почтой и паролем
export const loginWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Проверка на наличие email и uid
    if (!user.email || !user.uid) {
      throw new Error('Ошибка входа, нет данных пользователя.');
    }

    const userData = {
      email: user.email,
      uid: user.uid,
      role: 'user',  // Роль можно получать из базы данных или метаданных
    };

    // Сохраняем пользователя в Redux
    store.dispatch(setUser(userData));
    return user;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

// Выход пользователя
export const logout = async () => {
  try {
    await signOut(auth);
    store.dispatch(clearUser());  // Очищаем данные пользователя в Redux
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
};

// Получение текущего пользователя
export const getCurrentUser = () => auth.currentUser;
