# **Дипломный проект**
> backend

Веб-сервис по поиску фильмом, созданный в рамках сдачи диплома на курсе Веб-разработчик в [Яндекс Практикум](https://practicum.yandex.ru "сервис онлайн-образования"). Сервис позволяет искать фильмы, сохранять и удалять их в личном кабинете.

### **Структура проекта**
***
* Movie (backend) :star: *этот репозиторий*
* [Movie (frontend)](https://github.com/romankrivopalov/movies-explorer-frontend)

### **API**
***
* `POST /signup` — регистрация пользователя (name, email и password)
* `POST /signin` — авторизация пользователя (email и password, возвращает jwt)
* `GET /users/me` — возвращает информацию о пользователе (email и имя)
* `PATCH /users/me` — обновляет информацию о пользователе (email и имя)
* `GET /movies` — возвращает все сохранённые текущим пользователем фильмы
* `POST /movies` — создаёт фильм (country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail и movieId)
* `DELETE /movies/_id` — удаляет сохранённый фильм по id

### **Технологии**
***
* сервер на Ubuntu в Яндекс.Облаке
* API сервер `Node.js` + `Express.js`
* база данных `MongoDB` + `Mongoose`
* валидация данных `Celebrate`, `Validator`
* безопасность данных `Bcrypt`, `Jsonwebtoken`
* логирование запросов `Winston`
* менеджер процессов на сервере pm2
* SSL-сертификаты от Letsencrypt

***
[Открыть сайт в браузере](https://krivo.nomoredomains.rocks)\
[Ссылка на макет в Figma](https://www.figma.com/file/Ig7xSmE1dlZDPPLNv1Bqpq/Diploma-(Copy)?type=design&node-id=891%3A3857&t=cFEftSFF5Owm87eP-1)
