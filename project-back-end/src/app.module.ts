// src/app.module.ts
import { Module } from '@nestjs/common';
//controller e provider regiter;
import { RegisterSalaoController } from './controllers/salao/app.controller.register';
import { SalaoRegister } from './providers/salao.providers/register.service';
//controller  e provider Assinatura;
import { AssinaturaPlanoController } from './controllers/salao/app.controller.plano';
import { AssinaturaPlano } from './providers/salao.providers/plano.service';

@Module({
  imports: [],
  controllers: [
    RegisterSalaoController,
    AssinaturaPlanoController
  ],
  providers: [
    SalaoRegister,
    AssinaturaPlano
  ],
})
export class AppModule {}
