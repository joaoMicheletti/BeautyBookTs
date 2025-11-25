import { Controller, Body, Post } from "@nestjs/common";
import {Funcionario} from '../../providers/salao.providers/funcionario.service';
import { FuncionarioDto } from "../../providers/salao.providers/funcionario-register.dto";



@Controller()
export class FuncionarioController {
    constructor(private readonly funcionario: Funcionario){}
    @Post('/funcionario')
    async RegisterFuncionario(@Body() data:FuncionarioDto): Promise<object> {
        return await this.funcionario.RegisterFuncionario(data);
    };
    @Post('/funcionarios')
    async ListarFuncionarios(@Body() data: FuncionarioDto): Promise<object> {
        return await this.funcionario.ListarFuncionarios(data);
    };
    @Post('/deletarfuncionario')
    async DeletarFuncionario(@Body() data: FuncionarioDto): Promise<object> {
        return await this.funcionario.DeletarFuncionario(data);
    }
}