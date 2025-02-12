Инструкция по установке и запуску Электронной библиотеки
Шаг 1: Клонирование репозитория
Откройте терминал и выполните команду, чтобы клонировать репозиторий на ваш компьютер:

bash
Копировать
git clone https://github.com/S3gaM3/library.git
Перейдите в каталог проекта:

bash
Копировать
cd library
Шаг 2: Установка зависимостей
Убедитесь, что у вас установлен Node.js и npm. Вы можете проверить это, выполнив следующие команды:

bash
Копировать
node -v
npm -v
Если у вас еще нет Node.js, скачайте и установите его с официального сайта.

Установите все необходимые зависимости, выполнив команду:

bash
Копировать
npm install
Эта команда загрузит все зависимости, которые указаны в package.json.

Шаг 3: Настройка Firebase
Создайте проект на Firebase:

Перейдите на Firebase Console.
Нажмите "Add Project" и следуйте инструкциям.
Получите ваши конфигурационные данные Firebase:

В разделе "Project Settings" найдите раздел "Firebase SDK snippet".
Выберите "Config" и скопируйте предоставленные данные.
В файле src/firebaseConfig.js замените конфигурацию на ваши данные из Firebase:

javascript
Копировать
// src/firebaseConfig.js
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
Замените значения в firebaseConfig на те, которые вы получили в Firebase Console.

Шаг 4: Запуск приложения
После того как все зависимости установлены и конфигурация Firebase настроена, можно запустить приложение. Для этого выполните команду:

bash
Копировать
npm start
Это запустит приложение в режиме разработки, и оно будет доступно по адресу:

arduino
Копировать
http://localhost:3000
Шаг 5: Проверка работы
Откройте браузер и перейдите по адресу http://localhost:3000.
Вы должны увидеть страницу с каталогом книг. Вы также можете зарегистрироваться, войти или выйти из системы с помощью Firebase Authentication.
Шаг 6: Дополнительные действия
Если вы хотите создать продакшн сборку для деплоя на сервер, выполните команду:

bash
Копировать
npm run build
Это создаст оптимизированную версию приложения в папке build.

Проблемы и их решения:
Ошибка при запуске: module not found

Убедитесь, что вы выполнили команду npm install и все зависимости были загружены.
Проблемы с Firebase:

Проверьте, что вы правильно скопировали конфигурацию из Firebase Console и что ваши API-ключи активны.
Firebase не работает с вашим проектом:

Убедитесь, что вы добавили правильный домен и активировали Firebase Authentication с использованием email и пароля.
Поздравляем, вы успешно установили и запустили приложение! 🚀