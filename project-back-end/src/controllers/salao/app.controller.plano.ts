import { Body, Controller, Put } from "@nestjs/common";
import {AssinaturaPlano} from '../../providers/salao.providers/plano.service';
import {AssinaturaPlanoDto} from '../../providers/salao.providers/plano-update.dto';

@Controller()
export class AssinaturaPlanoController {
    //contrutor - service - provider
    constructor(private readonly plano: AssinaturaPlano) {};
    
    @Put('plano')
    async Assinatura(@Body() data: AssinaturaPlanoDto): Promise<string> {
    //console.log(rregister);
    return await this.plano.Assinatura(data);
  }

}