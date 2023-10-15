import express from 'express'
import { createUser, getCurrentUser, setUserInfo } from '../controllers/users';
import auth from '../middlewares/auth';

// import { getCurrentUser } from '../controllers/users'

const userRouter = express.Router();

userRouter.use(auth)

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', setUserInfo);

export {
  userRouter
}