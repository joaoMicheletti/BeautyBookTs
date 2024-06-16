import { Injectable } from "@nestjs/common";
import {AgendaSalaoDto} from './agenda-salao.dto';
import connection from "../../database/connection";
@Injectable()
export class Agenda {
    async BuscarAgendaSalao(data: AgendaSalaoDto): Promise<object> {
        const { dia, mes, ano, cpf_salao, cpf_funcionario} = data;
        const ListaSalao = await connection('agenda').where('cpf_salao', cpf_salao)
        .where('dia', dia).where('mes', mes).where('ano', ano).select('*');
        return ListaSalao;
    };
    async BuscarFuncionario(data: AgendaSalaoDto): Promise<object> {
        const { dia, mes, ano, cpf_salao, cpf_funcionario} = data; 
        const response = await connection('agenda')
        .where('cpf_funcionario', cpf_funcionario).where('dia', dia)
        .where('mes', mes).where('ano', ano).select('*');
        return response;
    }

}