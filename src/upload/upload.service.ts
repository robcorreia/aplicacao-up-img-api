import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private s3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
  }

  async uploadFile(file: any): Promise<any> {
    const urlKey = `${uuidv4()}-${file.originalname.replace(' ', '')}`;

    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: urlKey,
      ContentType: 'image/png',
      ACL: 'public-read',
    };

    return await this.s3.putObject(params).promise().then(() => {
      return { urlKey: urlKey };
    }, () => {
      throw new BadRequestException('Error no upload do arquivo');
    });
  }

  async deleteImagem(key: string): Promise<any> {
    console.log(key)
    return await this.s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    }).promise()
      .then(response => response)
      .catch(response => response);
  }
}
