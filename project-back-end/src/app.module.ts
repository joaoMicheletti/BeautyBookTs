// src/app.module.ts
import { Module } from '@nestjs/common';
//controller e provider regiter;
import { RegisterSalaoController } from './controllers/salao/app.controller.register';
import { SalaoRegister } from './providers/salao.providers/register.service';
//controller  e provider Assinatura;
import { AssinaturaPlanoController } from './controllers/salao/app.controller.plano';
import { AssinaturaPlano } from './providers/salao.providers/plano.service';
//controller e provider serviços
import {ServicosController} from './controllers/salao/app.controller.servicos';
import { Servicos } from './providers/salao.providers/servicos.service';
//controller e provider Horario de funcionamento;
import {HorarioFuncionamentoController} from './controllers/salao/app.controller.horarioFuncionamento';
import { Funcionamento } from './providers/salao.providers/funcionamento.service';

@Module({
  imports: [],
  controllers: [
    RegisterSalaoController,
    AssinaturaPlanoController,
    ServicosController,
    HorarioFuncionamentoController,
  ],
  providers: [
    SalaoRegister,
    AssinaturaPlano,
    Servicos,
    Funcionamento
  ],
})
export class AppModule {}
