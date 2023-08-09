import express, { Express, Request, Response} from "express";
import mongoose from "mongoose";
import { router } from "./routes";
import { cors } from 'cors-ts';

const app = express();
const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb'

mongoose.connect(DATABASE_URL)
  .then(() => console.log('База данных подключена'))
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
    console.log(err);
  });
const ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000'
];
const CORS_CONFIG = {
  origin: ORIGINS,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(CORS_CONFIG))

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send("Ответ получен")
})
app.use(router);



app.listen(PORT, () => {
  console.log(`Сервер запущен порт ${PORT}`);
})