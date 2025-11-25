import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
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

  //diretorio banco de dados
  const publicDirDb= path.join(__dirname, '..', '..', 'src', 'database');
  app.use('/dataBase', (req, res, next) => {
    const filePath = path.join(publicDirDb, 'DB.sqlite3');
     const fs = require('fs');
    if (fs.existsSync(filePath)) {
        // Defina o cabeçalho para download
        res.setHeader('Content-Disposition', 'attachment; filename=DB.sqlite3');
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(500).send('Erro ao enviar o arquivo.');
            }
        });
    } else {
        // Caso o arquivo não exista
        res.status(404).send('Arquivo não encontrado.');
    }
  })

  // Configuração do diretório estático
  const publicDir = path.join(__dirname, '..', '..', 'src', 'public'); // Ajuste o caminho para refletir a estrutura após a compilação

  app.use('/image', express.static(publicDir));

  await app.listen(1998);
  console.log(`Aplicação rodando em: http://localhost:1998 ${publicDir}`);
}

bootstrap();

