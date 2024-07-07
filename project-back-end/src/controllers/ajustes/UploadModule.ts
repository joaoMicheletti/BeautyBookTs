import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { diskStorage } from 'multer';
import * as path from 'path';
var t = path.join(__dirname, '..', '..', 'src', 'public');
console.log(t);

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '..','..','..','..', 'src', 'public'), // Diretório onde os arquivos serão armazenados
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
