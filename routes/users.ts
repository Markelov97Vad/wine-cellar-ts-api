import express from 'express'
import { getCurrentUser, logout, setUserInfo } from '../controllers/users';
import auth from '../middlewares/auth';

const userRouter = express.Router();

userRouter.use(auth)

userRouter.post('/signout', logout)
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', setUserInfo);

export {
  userRouter
}