"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb';
mongoose_1.default.connect(DATABASE_URL)
    .then(() => console.log('База данных подключена'))
    .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
    console.log(err);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.router);
app.get('/', (req, res) => {
    res.send("Ответ получен");
});
app.use('*', (req, res) => {
    res.status(404).send({ message: "страница не найдена" });
});
app.listen(PORT, () => {
    console.log(`Сервер запущен порт ${PORT}`);
});
