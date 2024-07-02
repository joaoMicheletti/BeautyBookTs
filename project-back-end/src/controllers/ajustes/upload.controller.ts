import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  @Post('/logo')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file); // Log do arquivo para depuração
    return {
      message: 'Arquivo enviado com sucesso!',
      filename: file.filename,
    };
  }
}
