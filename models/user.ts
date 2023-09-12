import mongoose from "mongoose";
import { regexEmail } from "../utils/config";

const userShema = new mongoose.Schema({
  nameUser: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
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
    select: false
  }
}, { versionKey: false });

export = mongoose.model('user', userShema);