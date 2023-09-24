import express from 'express'
import { createUser } from '../controllers/users';
// import { getCurrentUser } from '../controllers/users'

const userRouter = express.Router();

// userRouter.post('/signup', createUser)

export {
  userRouter
}