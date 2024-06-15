import { Body, Controller, Post } from "@nestjs/common";
import  {ServicosRegisterDto} from '../../providers/salao.providers/servicos-register.dot';
import {Servicos} from '../../providers/salao.providers/servicos.service';
@Controller()

export class ServicosController {
    constructor(private readonly Servicos: Servicos) {}
    @Post('/servicos')
    async Register(@Body() data: ServicosRegisterDto): Promise<string>{
        return await this.Servicos.Register(data);
    }
}