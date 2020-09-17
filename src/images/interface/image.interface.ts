import { Document } from 'mongoose';

export interface IImage extends Document {
  url: string;
  idUser: string;
  readonly description: string;
}