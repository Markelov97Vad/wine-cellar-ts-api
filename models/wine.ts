import mongoose from 'mongoose';

const wineShema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  grapeVariety: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  typeWine: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  reiting: {
    type: Number,
    required: false
  },
  comment: {
    type: String,
    requred: false
  }
}, { versionKey: false});

export = mongoose.model('wine', wineShema);
