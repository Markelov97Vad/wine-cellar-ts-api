import jwt from 'jsonwebtoken'


import { JWT_SECRET_DEV, ID_DEV, checkJWT } from './config';

function productionJwtCheck() {
  // создание токена для проверки, в режиме продакшена или разработки
  const token = jwt.sign(
    { _id: ID_DEV },
    checkJWT!,
    { expiresIn: 10 },
  );
  // проверка секретного ключа
  try {
    jwt.verify(token, JWT_SECRET_DEV);

    console.log('\x1b[31m%s\x1b[0m', `
      Надо исправить. В продакшне используется тот же
      секретный ключ, что и в режиме разработки.
    `);
  } catch (err: any ) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
  }
}

export default productionJwtCheck;
