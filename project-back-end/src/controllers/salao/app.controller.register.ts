// src/controllers/salao/register.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { SalaoRegister } from '../../providers/salao.providers/register.service';
import { SalaoRegisterDto } from '../../providers/salao.providers/salao-register.dto';

@Controller()
export class RegisterSalaoController {
  constructor(private readonly register: SalaoRegister) {}

  @Post('register')
  async Register(@Body() rregister: SalaoRegisterDto): Promise<string> {
    //console.log(rregister);
    return await this.register.Register(rregister);
  }
}
