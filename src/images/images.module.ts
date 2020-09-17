import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'images', schema: ImageSchema }]), UploadModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {
}
