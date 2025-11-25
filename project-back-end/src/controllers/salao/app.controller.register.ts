// src/controllers/salao/register.controller.ts
import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { SalaoRegister } from '../../providers/salao.providers/register.service';
import { SalaoRegisterDto } from '../../providers/salao.providers/salao-register.dto';


@Controller()
export class RegisterSalaoController {
  constructor(private readonly register: SalaoRegister) {}

  @Post('/registrarsalao')
  async Register(@Body() data: SalaoRegisterDto, @Res() res: Response): Promise<void> {
    //console.log(rregister);
    var result =  await this.register.Register(data);
    //console.log(result);
    res.send(result);
  };
  //rota de listagem de salão cadastrado;
  @Get('/listarsalao')
  async ListarSalao(@Body() data:SalaoRegisterDto): Promise<object>{
    return await this.register.ListarSalao(data)
  };
//rota para buscar um salão 
  @Post('/buscarsalao')
  async Salao(@Body() data: SalaoRegisterDto): Promise<object>{
    return await this.register.Salao(data);
  };
  // Rota para buscar Parceiro;.
  @Post('/parceiros')
  async buscarParceiro(@Body() data:SalaoRegisterDto): Promise<object>{
    return await this.register.buscarParceiro(data);
  };
}

