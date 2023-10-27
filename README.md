<h1 align="center">Веб-сайт: "Wine cellar" (Backend)</h1>

_____

<a name="summary">
  <details>
    <summary>Оглавление</summary>
    <ol>
      <li><a href="#project-description">Описание проекта</a></li>
      <li><a href="#technologies">Стек технологий</a></li>
      <li><a href="#installation">Установка и запуск приложения в локальном репозитории, эксплуатация</a></li>
      <li><a href="#functionality">Функционал</a></li>
      <li><a href="#enhancement">Планы по улучшению</a></li>
    </ol>
  </details>
</a>

<a name="project-description"><h2>1. Описание проекта</h2></a>
Backend веб-сайта <a href="https://my-wine-cellar.space/" target="_blank">"Wine cellar"</a>. Создан по принципам архитектурной системы `REST API`, включающий функцию ```CRUD```. Используется фреймворк - <a href="https://expressjs.com/ru/" target="_blank">```Express```</a> и взаимодействие с NoSQL базой данных <a href="https://www.mongodb.com/" target="_blank">`MongoDB`</a>. Описание frontend части вы можете прочитать тут => <a href="https://github.com/Markelov97Vad/wine-cellar-ts#1-описание-проекта" target="_blank">Frontend repository Wine cellar (описание проекта)</a>

____

<b>Ссылки на проект:</b>

Frontend (деплой): https://my-wine-cellar.space/

Frontend (repository): https://github.com/Markelov97Vad/wine-cellar-ts

Backend: https://api-my-wine-cellar.space/


___

<a name="technologies"><h2>2. Стек технологий</h2></a>

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

____

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="installation"><h2>3. Установка и запуск приложения в локальном репозитории, эксплуатация</h2></a>
1. `git clone https://github.com/Markelov97Vad/wine-cellar-ts-api.git` - клонировать репозиторий на свое устройство (HTTPS)
2. `npm i` - установить зависимости
3. `npm run build` - создать сборку `JS`
4. `npm run start` - запустить приложение

<h3>Важно!</h3>Для корректной работы в локальном репозитории нужна СУБД NoSQL <a href="https://www.mongodb.com/">MongoDB</a>.

____

<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="functionality"><h2>4. Функционал</h2></a>

- Использование инструмента для моделирования объектов `MongoDB` - `Mongoose`
- Реализация веб-токенов JSON - `jsonwebtoken`
- Хеширование пароля - `bcrypt`
- Регистрация/авторизация/аутентификация пользователя
- Защита роутов
- GET/POST/PUT/PATCH/DELETE методы взаимодействия с коллекцией
- Централизованная обработка ошибок


<div align="right">(<a href="#summary">к оглавлению</a>)</div>

<a name="enhancement"><h2>5. Планы по улучшению</h2></a>
- Добавить проверку входных данных перед выполнением функции обработчика
- Ограничить лимит запросов
- Логирование запросов

___
