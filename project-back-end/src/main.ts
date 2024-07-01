import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Caminho absoluto para o diretório estático
  const publicDir = path.join(__dirname, '..', 'public');

  // Configuração do diretório estático
  app.use('/img', express.static(publicDir));

  await app.listen(3000);
  console.log(`Aplicação rodando em: http://localhost:3000`);
}

bootstrap();
