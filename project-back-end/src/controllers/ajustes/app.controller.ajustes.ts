import { Controller, Post, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
//import { FileInterceptor } from "@nestjs/platform-express";
import { Ajustes } from "src/providers/ajustes/ajustes.service";
import { AjustesDto } from "src/providers/ajustes/ajustes.dto";


@Controller()
export class AjustesController {
    constructor(private readonly ajustes: Ajustes) {}

    @Post('/intervalo')
    async IntervaloAgendamento(@Body() data: AjustesDto): Promise<string> {
        return await this.ajustes.IntervaloAgendamento(data);
    }

    @Post('/cimahora')
    async EmCimaDaHora(@Body() data: AjustesDto): Promise<string> {
        return await this.ajustes.EmCimaDaHora(data);
    }

    @Post('/agendamentoate')
    async AgendamentoAte(@Body() data: AjustesDto): Promise<string> {
        return await this.ajustes.AgendamentoAte(data);
    }

    @Post('/pass')
    async SenhaSalao(@Body() data: AjustesDto): Promise<string> {
        return await this.ajustes.SenhaSalao(data);
    }

    @Post('/editarsalao')
    async EditarSalao(@Body() data: AjustesDto): Promise<string> {
        return await this.ajustes.EditarSalao(data);
    }

    @Post('/passfuncionarios')
    async SenhaFuncionario(@Body() data: AjustesDto): Promise<object> {
        return await this.ajustes.SenhaFuncionario(data);
    };
    /**
    @Post('/logo')
    @UseInterceptors(FileInterceptor('image', MulterConfig))
    async AdicionarImagem(@UploadedFile() file: Express.Multer.File, @Body() data: AjustesDto): Promise<object> {
        console.log('here');
        const uploadImagemDto: UploadImagemDto = { file, data };
        return this.ajustes.AdicionarImagem(uploadImagemDto);
    }*/

    @Post('/logosalao')
    async LogoSalao(@Body() data: AjustesDto): Promise<object> {
        return await this.ajustes.LogoSalao(data);
    }
}
