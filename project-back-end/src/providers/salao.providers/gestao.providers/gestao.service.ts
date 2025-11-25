import { Injectable } from "@nestjs/common";
import { GestaoDto } from "./gestao.dto";
import connection from "../../../database/connection";

@Injectable()
export class Gestao {
    async FinalizadosDiarios(data : GestaoDto): Promise<object> {
        var fullDateInit = data.inicio.split("/");

        if(data.periodo === 'dia'){
            var resp = await connection('agenda').where('cpf_salao', data.cpf_salao)
            .where('mes', fullDateInit[1]).where('ano', fullDateInit[2]).where('dia', fullDateInit[0]);
            return {resp};
        } else if(data.periodo ==="mes") {
            var resp = await connection('agenda')
            .where('cpf_salao', data.cpf_salao)
            .where('mes', fullDateInit[1])
            .where('ano', fullDateInit[2]).select("*")
            return {resp}
        } else if(data.periodo === 'ano'){
            var resp = await connection('agenda')
            .where('cpf_salao', data.cpf_salao)
            .where('ano', fullDateInit[2]).select("*")
            return {resp}
        };
    };
};