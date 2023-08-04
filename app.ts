import express, { Express, Request, Response} from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb'

mongoose.connect(DATABASE_URL)
  .then(() => console.log('База данных подключена'))
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
    console.log(err);
  })

app.listen(port, () => {
  console.log(`Сервер запущен порт ${port}`);
})