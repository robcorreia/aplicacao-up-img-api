import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  idUser: { type: String },
  description: { type: String, require: true },
  url: { type: String, require: true },
}, { collection: 'images', timestamps: true });