import {Controller, Body, Post}  from "@nestjs/common";
import {Gestao} from '../../../providers/salao.providers/gestao.providers/gestao.service';
import {GestaoDto} from '../../../providers/salao.providers/gestao.providers/gestao.dto';
@Controller()
export class GestaoController {
    constructor(private readonly gestao: Gestao){}
    //routes.post('/relatoriodiario', Diaria.FinalizadosDiarios);
    @Post('/relatioriodiario')
    async FinalizadosDiarios(@Body() data: GestaoDto): Promise<object> {
        return await this.gestao.FinalizadosDiarios(data);
    };
    @Post('/relatoriodiariocancelado')
    async Cancelados(@Body() data: GestaoDto): Promise<object> {
        return await this.gestao.Cancelados(data);
    };
};