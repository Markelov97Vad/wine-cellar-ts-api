import mongoose from "mongoose";
import { UNAUTHORIZED_LOGIN_MESSAGE, regexEmail } from "../utils/config";
import UnauthorizedError from "../errors/UnauthorizedError";
import bcrypt from 'bcrypt'

const userShema = new mongoose.Schema({
  nameUser: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  surname: {
    type: String,
    required: false,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(value: string) {
        return regexEmail.test(value);
      },
      message: 'Некорректный email'
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
}, {
  statics: {
    findUserByCredentails(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            throw new UnauthorizedError(UNAUTHORIZED_LOGIN_MESSAGE);
          } return bcrypt.compare(password, user.password)
            .then(matched => {
              // console.log(matched);

              if(!matched) {
                throw new UnauthorizedError(UNAUTHORIZED_LOGIN_MESSAGE)
              } return user;
            })
        });
    },
  },
  versionKey: false
});

export = mongoose.model('user', userShema);