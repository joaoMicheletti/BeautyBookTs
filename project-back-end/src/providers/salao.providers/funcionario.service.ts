import { Injectable } from "@nestjs/common";
import {FuncionarioDto} from './funcionario-register.dto';
import connection from "../../database/connection";

@Injectable()
export class Funcionario{
    async RegisterFuncionario(data: FuncionarioDto): Promise<object> {
        const {
            cpf_salao,
            nome_completo,
            cpf_funcionario,
            senha,
        } = data;
        const Data = data;
        const info = await connection('salao').where('cpf_salao', cpf_salao).select('*');

        if(info[0].plano === 'plano individual'){
            return {res: "Seu Plano não permite cadastrar Funcionários"};
        } else if(info[0].plano === 'personalizado'){
            if(info[0].quantidade_funcionarios < info[0].limite_funcionarios){
                await connection('funcionarios').insert(Data);
                await connection('salao').where('cpf_salao', cpf_salao).update('quantidade_funcionarios', info[0].quantidade_funcionarios + 1);
            } else {
                return {res: "você exedeu o limite de funcionários cadastrado"};
            };
        }
        return info;
    }
};