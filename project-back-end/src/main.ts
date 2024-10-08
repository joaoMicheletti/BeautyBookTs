import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*', // Ajuste conforme necessário para definir as origens permitidas
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

  // Configuração do diretório estático
  const publicDir = path.join(__dirname, '..', '..', 'src', 'public'); // Ajuste o caminho para refletir a estrutura após a compilação

  app.use('/image', express.static(publicDir));

  await app.listen(1998);
  console.log(`Aplicação rodando em: http://localhost:1998 ${publicDir}`);
}

bootstrap();

