# Электронная библиотека

Веб-приложение для просмотра книг, с возможностью регистрации и входа через **Firebase**.

## Установка и запуск

### Шаг 1: Клонирование репозитория

1. Клонируйте репозиторий:
   
   git clone https://github.com/S3gaM3/library.git
   cd library
   
Шаг 2: Установка зависимостей

Убедитесь, что у вас установлен Node.js и npm:

node -v
npm -v

Установите зависимости:


npm install

Шаг 3: Настройка Firebase

Создайте проект на Firebase Console.
Перейдите в "Project Settings" > "Firebase SDK snippet" > "Config" и скопируйте конфигурационные данные.
Замените конфигурацию в src/firebaseConfig.js:

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

Шаг 4: Запуск приложения

Запустите приложение:

npm start
Приложение будет доступно по адресу: http://localhost:3000.

Шаг 5: Проверка работы

Откройте браузер и перейдите по адресу http://localhost:3000. Вы должны увидеть страницу с каталогом книг и возможность зарегистрироваться или войти.


Шаг 6: Продакшн сборка

Если вы хотите создать оптимизированную сборку для продакшн:


npm run build
Проблемы и их решения

Ошибка: module not found
Убедитесь, что вы выполнили команду npm install и все зависимости установлены.

Проблемы с Firebase
Проверьте, что вы правильно скопировали конфигурацию Firebase и активировали Firebase Authentication с использованием email и пароля.
