"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_ts_1 = require("cors-ts");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const centralizedErrorHandler_1 = require("./middlewares/centralizedErrorHandler");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = 3005;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/winecellardb';
mongoose_1.default.connect(DATABASE_URL)
    .then(() => console.log('База данных подключена'))
    .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', 'Ошибка в подключении БД');
    console.log('ошибка с базой', err);
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
app.use('*', (0, cors_ts_1.cors)(CORS_CONFIG));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// app.get('/wines', (req, res) => {
//   console.log(req.url, req.method);
//   // res.send("Ответ получен")
// })
app.use(routes_1.router);
// app.use(auth);
app.use(centralizedErrorHandler_1.centralizedErrorHandler);
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('\x1b[33m%s\x1b[0m', 'Код запущен в режиме разработки');
    }
    // productionJwtCheck();
    console.log(`Сервер запущен порт ${PORT}`);
});
