export const regexUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const { NODE_ENV, JWT_SECRET } = process.env
export const JWT_SECRET_DEV = 'some-secret-key';
export const checkJWT = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV;
export const ID_DEV = '6453eb794cc906a7f9131c00';
// статус ответа
export const OK_CODE = 200;
export const CREATED_CODE = 201;
export const BAD_REQUEST_CODE = 400;
export const UNAUTHORIZED_CODE = 401;
export const FORBIDDEN_CODE = 403;
export const NOT_FOUND_CODE = 404;
export const CONFLICT_CODE = 409;
export const SERVER_ERROR_CODE = 500;
// сообщение ответа
export const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
export const FORBIDDEN_MESSAGE = 'Невозможно удалить чужие данные';
export const NOT_FOUND_MESSAGE = 'Данные с указанным id не найдены';
export const NOT_FOUND_PATH_MESSAGE = 'Ресурс не найден. Проверьте URL и метод запроса';
export const DELETE_MESSAGE = 'Данные удалены';
export const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
export const BAD_REQUEST_MESSAGE_UPDATE = 'Передан несуществующий id карточки.'
export const CONFLICT_MESSAGE = 'При регистрации указан email, который уже существует на сервере';
export const UNAUTHORIZED_AUTH_MESSAGE = 'Необхадима авторизация';
export const UNAUTHORIZED_LOGIN_MESSAGE = 'Неправильные почта или пароль';
