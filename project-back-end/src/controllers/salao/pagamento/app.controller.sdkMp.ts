import {Controller, Body, Post} from '@nestjs/common';

import { SdkMercadopagoDto } from 'src/providers/salao.providers/pagamento.providers/sdkMp.dto';
import { SdkMp } from 'src/providers/salao.providers/pagamento.providers/sdkMp.service';

@Controller()
export class SdkMercadopagoController {
    constructor(private readonly sdk: SdkMp){}
    
    @Post('/preferenceid')
    async Preferenceid(@Body() data:SdkMercadopagoDto): Promise<object>{
        return await this.sdk.Preferenceid(data);
    };
    @Post('/buscarpg')
    async BuscarPagamento(@Body() data:SdkMercadopagoDto): Promise<object>{
        return await this.sdk.BuscarPagamento(data);
    };
    @Post('/pending')
    async Pending(@Body() data: SdkMercadopagoDto): Promise<object>{
        return await this.sdk.Pending(data);
    }

}