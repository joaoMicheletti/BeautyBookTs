import { Body, Controller, Post, Put } from "@nestjs/common";
import  {ServicosRegisterDto} from '../../providers/salao.providers/servicos-register.dot';
import {Servicos} from '../../providers/salao.providers/servicos.service';
@Controller()

export class ServicosController {
    constructor(private readonly Servicos: Servicos) {}
    @Post('/servicos')
    async Register(@Body() data: ServicosRegisterDto): Promise<string>{
        return await this.Servicos.Register(data);
    };
    @Post('/servico')
    async Listar(@Body() data: ServicosRegisterDto): Promise<object> {
        return await this.Servicos.Listar(data);
    };
    @Put('/servicos')
    async EditarServico(@Body() data: ServicosRegisterDto): Promise<string>{
        return await this.Servicos.EditarServico(data);
    };
    @Post('/deletarservicos')
    async Delete(@Body() data: ServicosRegisterDto): Promise<string> {
        return await this.Servicos.Delete(data);
    }

}