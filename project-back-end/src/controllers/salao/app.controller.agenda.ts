import { Controller, Post, Body } from "@nestjs/common";
import {AgendaSalaoDto} from '../../providers/salao.providers/agenda-salao.dto';
import {Agenda} from '../../providers/salao.providers/agenda.service';

@Controller()
export class AgendaController {
    constructor(private readonly agenda: Agenda) {}
    @Post('/buscasalao')
    async BuscarAgendaSalao(@Body() data: AgendaSalaoDto): Promise<object> {
        return await this.agenda.BuscarAgendaSalao(data);
    };
}