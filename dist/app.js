"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const cors_ts_1 = require("cors-ts");
const app = (0, express_1.default)();
const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb';
mongoose_1.default.connect(DATABASE_URL)
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
app.use('*', (0, cors_ts_1.cors)(CORS_CONFIG));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("Ответ получен");
});
app.use(routes_1.router);
app.listen(PORT, () => {
    console.log(`Сервер запущен порт ${PORT}`);
});
