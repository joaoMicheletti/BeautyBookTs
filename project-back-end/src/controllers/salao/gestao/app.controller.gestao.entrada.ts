import {Controller, Body, Post}  from "@nestjs/common";
import {GestaoEntrada} from '../../../providers/salao.providers/gestao.providers/getao.entrada.sevice';
import {GestaoDto} from '../../../providers/salao.providers/gestao.providers/gestao.dto';
@Controller()
export class GestaoEntradaController {
    constructor(private readonly gestao: GestaoEntrada){}
    @Post('/rentrada')
    async RelatorioDeEntrada(@Body() data:GestaoDto): Promise<object>{
        return await this.gestao.RelatorioDeEntrada(data);
    };
    @Post('/remes')
    async RelatorioMes(@Body() data: GestaoDto): Promise<object> {
        return await this.gestao.RelatorioMes(data);
    };
    @Post('/reano')
    async RelatorioAno(@Body() data: GestaoDto): Promise<object> {
        return await this.gestao.RelatorioAno(data);
    }
};