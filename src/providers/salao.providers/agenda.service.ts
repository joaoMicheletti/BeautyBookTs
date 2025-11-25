import { Injectable } from "@nestjs/common";
import {AgendaSalaoDto} from './agenda-salao.dto';
import connection from "../../database/connection";
@Injectable()
export class Agenda {
    async BuscarAgendaSalao(data: AgendaSalaoDto): Promise<object> {
        const { dia, mes, ano, cpf_salao} = data;
        console.log(dia, mes, ano, cpf_salao)
        const agendaBusca = await connection('agenda').where('cpf_salao', cpf_salao)
        .where('dia', dia).where('mes', mes).where('ano', ano).select('*');
        console.log(agendaBusca);
        if(agendaBusca.length === 0){
            return {res: 'nenhum agendamento encontrado.'}
        }else {
            return agendaBusca;
        };
                
    };
    async BuscarFuncionario(data: AgendaSalaoDto): Promise<object> {
        const { dia, mes, ano, cpf_salao, cpf_funcionario} = data; 
        const response = await connection('agenda')
        .where('cpf_funcionario', cpf_funcionario).where('dia', dia)
        .where('mes', mes).where('ano', ano).select('*');
        if(response.length === 0){
            return {res: "nenhum agendamento encontrado "};
        }
        return response;
    }
};