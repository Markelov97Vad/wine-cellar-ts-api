import express, { Express, Request, Response} from "express";
import mongoose from "mongoose";
import { cors } from 'cors-ts';
import cookieParser from 'cookie-parser';
import { centralizedErrorHandler } from "./middlewares/centralizedErrorHandler";
import { router } from "./routes";
import productionJwtCheck from "./utils/productionJwtCheck";
import auth from "./middlewares/auth";

const app = express();
const PORT = 3005;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb'

mongoose.connect(DATABASE_URL)
  .then(() => console.log('База данных подключена'))
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
    console.log('ошибка с базой',err);
  });
const ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://localhost:3002',
  'https://my-wine-cellar.space'
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

app.use(cookieParser());

// app.get('/wines', (req, res) => {
//   console.log(req.url, req.method);
//   // res.send("Ответ получен")
// })
app.use(router);
// app.use(auth);

app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\x1b[33m%s\x1b[0m', 'Код запущен в режиме разработки');
  }
  // productionJwtCheck();
  console.log(`Сервер запущен порт ${PORT}`);
})