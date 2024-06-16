import { Injectable } from "@nestjs/common";
import {AgendaSalaoDto} from './agenda-salao.dto';
import connection from "src/database/connection";
@Injectable()
export class Agenda {
    async BuscarAgendaSalao(data: AgendaSalaoDto): Promise<object> {
        const { dia, mes, ano, cpf_salao, cpf_funcionario} = data;
        const ListaSalao = await connection('agenda').where('cpf_salao', cpf_salao)
        .where('dia', dia).where('mes', mes).where('ano', ano).select('*');
        return ListaSalao;
    }

}