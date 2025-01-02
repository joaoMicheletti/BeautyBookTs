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
        console.log(Data);
        const info = await connection('salao').where('cpf_salao', cpf_salao).select('*');
        console.log(info[0].plano, "ola");

        if(info[0].plano === 'plano individual'){
            return {res: "Seu Plano não permite cadastrar Funcionários"};
        } else if(info[0].plano === 'plano personalizado'){
            if(info[0].quantidade_funcionarios < info[0].limite_funcionarios){
                await connection('funcionarios').insert(Data);
                await connection('salao').where('cpf_salao', cpf_salao).update('quantidade_funcionarios', info[0].quantidade_funcionarios + 1);
            } else {
                return {res: "você exedeu o limite de funcionários cadastrado"};
            };
        }
        console.log(info, 'This');
        return {res: "Contrate um plano para cadastrar seus funcionáriuos."};
    };
    async ListarFuncionarios(data: FuncionarioDto): Promise<object> {
        const {cpf_salao} = data;
        const List = await connection('funcionarios').where('cpf_salao', cpf_salao).select('*');
        return List;
    };
    async DeletarFuncionario(data: FuncionarioDto): Promise<object> {
        const {cpf_funcionario, cpf_salao} = data;
        const Funcionario = await connection('funcionarios').where('cpf_salao', cpf_salao).where('cpf_funcionario',cpf_funcionario).delete();
        if(Funcionario > 0){
            const quntidadeFuncionario = await connection('salao').where('cpf_salao', cpf_salao).select('quantidade_funcionarios');
            await connection('salao').where('cpf_salao', cpf_salao).update('quantidade_funcionarios', quntidadeFuncionario[0].quantidade_funcionarios - 1);
        };
        //limpar dados referente ao funcionario deletado na tabela agenda.
        await connection('agenda').where('cpf_funcionario', cpf_funcionario).delete('*');
        return {res: "Funcionário Deletado"};
        //1210101010
    };
};