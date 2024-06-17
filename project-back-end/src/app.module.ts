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
//controller e provide de Agenda;
import { AgendaController } from './controllers/salao/app.controller.agenda';
import { Agenda } from './providers/salao.providers/agenda.service';
//controller e provider de Funcionario;
import { FuncionarioController } from './controllers/salao/app.controleer.funcionario';
import { Funcionario } from './providers/salao.providers/funcionario.service';
//controller e provider de login  
import { LoginController } from './controllers/salao/app.controller.login';
import { Login } from './providers/salao.providers/login.service';


@Module({
  imports: [],
  controllers: [
    RegisterSalaoController,
    AssinaturaPlanoController,
    ServicosController,
    HorarioFuncionamentoController,
    AgendaController,
    FuncionarioController,
    LoginController
  ],
  providers: [
    SalaoRegister,
    AssinaturaPlano,
    Servicos,
    Funcionamento,
    Agenda,
    Funcionario,
    Login
  ],
})
export class AppModule {}
