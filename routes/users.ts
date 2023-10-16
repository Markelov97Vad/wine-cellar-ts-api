import express from 'express'
import { createUser, getCurrentUser, logout, setUserInfo } from '../controllers/users';
import auth from '../middlewares/auth';

// import { getCurrentUser } from '../controllers/users'

const userRouter = express.Router();

userRouter.use(auth)

userRouter.post('/signout', logout)
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', setUserInfo);

export {
  userRouter
}