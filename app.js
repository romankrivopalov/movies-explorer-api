// модуль для загрузки переменных из .env среды
require('dotenv').config();

// веб-фреймворк для Node.js
const express = require('express');

// модуль для защиты приложения express, устанавливает заголовки ответа HTTP
const helmet = require('helmet');

// модуль настройки кросс-доменных запросов, cors
const cors = require('cors');

// модуль ограничивает повторные запросы к api
const rateLimit = require('express-rate-limit');

// модуль для работы с cookie
const cookieParser = require('cookie-parser');

// модуль для работы с mongodb
const mongoose = require('mongoose');

// модуль для маршрутизации
const router = require('./routes');

// мидлвар обработки ошибок
const handleError = require('./middlewares/handleError');

// const handleError = require('./middlewares/handleError');
const { limiterSetting } = require('./utils/constants');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

// создание сервера
const app = express();

// подключение лимитера
const limiter = rateLimit(limiterSetting);
app.use(limiter);

// подключение модуля cors
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://krivo.nomoredomains.rocks',
  ],
  credentials: true,
  maxAge: 30,
}));

// подключение хелмета
app.use(helmet());

// использование метода для распознованиия взодящего запроса как объекта JSON
app.use(express.json());

// подключение куки парсера
app.use(cookieParser());

// подключение модуля к базе данных
mongoose.connect(DB_ADDRESS, {});

//
app.use(requestLogger);

//
app.use(router);

//
app.use(errorLogger);

//
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
