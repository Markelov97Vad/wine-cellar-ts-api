import mongoose from 'mongoose';

const wineShema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  colorWine: {
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
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  brand: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    requred: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }]
}, { versionKey: false});

export = mongoose.model('wine', wineShema);
