import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalaoRegister } from '../../providers/salao.providers/register.service';

@Controller()
export class RegiterSalaoController {
  constructor(private readonly register: SalaoRegister) {}

  @Get('/register')
  Registrar(@Body() register: SalaoRegister): string {
    
    return this.register.Register();
    

  }
  /**
 
   * const {
            cpf_salao, string not
            nome_salao, string not
            endereco, string not
            cep, int not
            email, string not
            senha, string not
            data_cadastro, date == string not
            indicado_por string not ''
        } = request.body;
   */
  
}
