import { Module } from '@nestjs/common';
import { RegiterSalaoController } from './controllers/salao/app.controller.register';
import { SalaoRegister } from './providers/salao.providers/register.service';

@Module({
  imports: [],
  controllers: [
    RegiterSalaoController
  ],
  providers: [
    SalaoRegister
  ],
})
export class AppModule {}
