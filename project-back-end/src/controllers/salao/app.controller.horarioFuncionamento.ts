import { Body, Controller, Post } from "@nestjs/common";
import {Funcionamento} from '../../providers/salao.providers/funcionamento.service';
import {FuncionamentoDto} from '../../providers/salao.providers/horario-funcionamento.dts';

@Controller()
export class HorarioFuncionamentoController {
    constructor( private readonly horario: Funcionamento) {};

    @Post('/horariofuncionamento')
    async HorarioFuncionament(@Body() data: FuncionamentoDto): Promise<string> {
        return await this.horario.HorarioFuncionamento(data);
    }
}


