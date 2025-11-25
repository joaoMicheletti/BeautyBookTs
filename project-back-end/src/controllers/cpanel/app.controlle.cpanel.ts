import { Body, Controller, Post } from "@nestjs/common";
import {CpanelDto} from '../../providers/cpanel/cpanel.dto';
import { Cpanel } from "../../providers/cpanel/cpanel.service";
//import { Cpanel } from "src/providers/cpanel/cpanel.service";







@Controller()
export class CpanelController {
    constructor(private readonly cpanel:Cpanel) {};
    @Post('/cpanelpass')
    async CpanelSenha(@Body() data:CpanelDto): Promise<string>{
        return await this.cpanel.CpanelSenha(data);
    };
    @Post('/cpanelplano')
    async EditarPlano(@Body() data: CpanelDto): Promise<string>{
        return await this.cpanel.EditarPlano(data);
    };
    // update assinatura;
    @Post('/cpanelassinatura')
    async EditarAssinatura(@Body() data: CpanelDto): Promise<string>{
        return await this.cpanel.EditarAssinatura(data);
    };
    //editar assinatura_status; 
    @Post('/cpanelassinatura_status')
    async EditarAssinaturaStatus(@Body() data:CpanelDto){
        return await this.cpanel.EditarAssinaturaStatus(data);
    };
    //editar data de inicio do plano;
    @Post('/cpaneldata_inicio_plano')
    async DataInicio(@Body() data:CpanelDto): Promise<string>{
        return await this.cpanel.DataInicio(data);
    };
    //editar data_vencimento_plano
    @Post('/cpaneldata_vencimento_plano')
    async DataFim(@Body() data:CpanelDto): Promise<string> {
        return await this.cpanel.DataFim(data);
    };
    // editar limite de funcionário;
    @Post('/cpanellimite_funcionarios')
    async FuncionarioLimite(@Body() data:CpanelDto): Promise<string>{
        return await this.cpanel.FuncionarioLimite(data);
    };
    //login cpanel;
    @Post('/cpanellogin')
    async Logar(@Body() data: CpanelDto): Promise<object>{
        return await this.cpanel.Logar(data);
    };
// cadastro c panel;
    @Post('/cadcpanel')
    async AdmCad(@Body() data : CpanelDto): Promise<object>{
        return await this.cpanel.AdmCad(data);
    };
}