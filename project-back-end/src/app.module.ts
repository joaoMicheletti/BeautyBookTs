// src/app.module.ts
import { Module } from '@nestjs/common';
import { RegisterSalaoController } from './controllers/salao/app.controller.register';
import { SalaoRegister } from './providers/salao.providers/register.service';

@Module({
  imports: [],
  controllers: [RegisterSalaoController],
  providers: [SalaoRegister],
})
export class AppModule {}
