import express, { Express, Request, Response} from "express";
import mongoose from "mongoose";
import { router } from "./routes";

const app = express();
const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb'

mongoose.connect(DATABASE_URL)
  .then(() => console.log('База данных подключена'))
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use(router);

app.get('/', (req, res) => {
  res.send("Ответ получен")
})
app.use('*', (req, res) => {
  res.status(404).send({ message: "страница не найдена"})
})


app.listen(PORT, () => {
  console.log(`Сервер запущен порт ${PORT}`);
})