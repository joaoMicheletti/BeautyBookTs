import { Body, Controller, Post, Put } from "@nestjs/common";
import {Funcionamento} from '../../providers/salao.providers/funcionamento.service';
import {FuncionamentoDto} from '../../providers/salao.providers/horario-funcionamento.dto';

@Controller()
export class HorarioFuncionamentoController {
    constructor( private readonly horario: Funcionamento) {};

    @Post('/horariofuncionamento')
    async HorarioFuncionament(@Body() data: FuncionamentoDto): Promise<string> {
        return await this.horario.HorarioFuncionamento(data);
    };
    @Put('/horariofuncionamento')
    async EditarHorario(@Body() data: FuncionamentoDto): Promise<string> {
        return await this.horario.EditarHorario(data);
    }
}


