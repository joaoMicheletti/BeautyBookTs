import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do diretório estático
  const publicDir = path.join(__dirname, '..', 'src', 'public'); // Ajuste o caminho para refletir a estrutura após a compilação
  app.use('/image', express.static(publicDir));

  await app.listen(3000);
  console.log(`Aplicação rodando em: http://localhost:3000 ${publicDir}`);
}

bootstrap();
