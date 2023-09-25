import express from 'express'
import { createUser, getCurrentUser } from '../controllers/users';
import auth from '../middlewares/auth';

// import { getCurrentUser } from '../controllers/users'

const userRouter = express.Router();

userRouter.use(auth)

userRouter.get('/me', getCurrentUser)

export {
  userRouter
}