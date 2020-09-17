import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IImage } from './interface/image.interface';
import { CreateImageDto } from './dtos/create-image.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ImagesService {

  constructor(
    @InjectModel('images') private readonly imageModel: Model<IImage>,
    private uploadService: UploadService,
  ) {

  }

  async getAllImages(): Promise<IImage[]> {
    let images = await this.imageModel.find().exec();
    images = images.map(image => {
      image.url = `${process.env.APP_ADDRESS}${image.url}`;
      return image;
    });
    return images;
  }

  async createPost(image: CreateImageDto): Promise<any> {
    return this.imageModel.create(image);
  }

  async deleteImage(_id: string): Promise<any> {
    const image = await this.imageModel.findOne({ _id }).exec();
    await this.imageModel.findByIdAndRemove(_id).exec();
    await this.uploadService.deleteImagem(image.url);
    return { deleted: true };
  }
}
