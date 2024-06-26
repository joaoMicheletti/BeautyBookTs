import { Body, Controller, Post, Put } from "@nestjs/common";
import { ClienteDto } from "src/providers/cliente/cliente.dto";
import { Cliente } from "src/providers/cliente/cliente.service";

@Controller()
export class ClienteContrller {
    constructor(private readonly cliente: Cliente){}
    //rota para listar horarios livres na agenda
    @Post('/horarioslivres')
    async ConsultarEspacoLivreNaAgenda(@Body() data :ClienteDto): Promise<string>{
        return await this.cliente.ConsultarEspacoLivreNaAgenda(data);
    };
    //rota para registrar o agendamento
    @Post('/registraragendamento') 
    async CriarAgendamento(@Body() data: ClienteDto): Promise<object>{
        return await this.cliente.CriarAgendamento(data);
    };
    //rota para listar os horarios já preenchidos num salão individual ou num funcionário;
    @Post('/horariospreenchidos')
    async HorariosPreenchidos(@Body() data: ClienteDto): Promise<object>{
        return await this.cliente.HorariosPreenchidos(data);
    };
    //rota para validar so o agendamento futuro do cliente será permitido;
    @Post('/agendamentosfuturos')
    async AgendamentosFuturos(@Body() data: ClienteDto): Promise<string> {
        return await this.cliente.AgendamentosFuturos(data);
    };
    //rota para cancelar um serviço
    @Put('/cancelarservico') 
    async UpdateStatusServicoCancelar(@Body() data: ClienteDto): Promise<string> {
        return await this.cliente.UpdateStatusServicoCancelar(data);
    };
    //rot pa finalizar um serviço
    @Put('/finalizarservico') 
    async UpdateStatusServicoFinalizar(@Body() data: ClienteDto): Promise<string> {
        return await this.cliente.UpdateStatusServicoFinalizar(data);
    };
}