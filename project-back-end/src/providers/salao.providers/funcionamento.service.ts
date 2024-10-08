import { Injectable } from "@nestjs/common";
import {FuncionamentoDto} from './horario-funcionamento.dto';
import connection from "../../database/connection";

@Injectable()
export class Funcionamento {
    async HorarioFuncionamento(data: FuncionamentoDto): Promise<string> {
        const {
            cpf_salao,
            dia,
            inicio_trabalhos,
            fim_trabalhos
        } = data;
        const Data = data;
        await connection('horarios').insert(Data);
        return "Cadastrado";
    };
    async EditarHorario(data: FuncionamentoDto): Promise<string> {
        const {
            cpf_salao,
            dia,
            inicio_trabalhos,
            fim_trabalhos
        } = data;
        await connection('horarios')
        .where('cpf_salao', cpf_salao).where('dia', dia)
        .update('inicio_trabalhos', inicio_trabalhos)
        .update('fim_trabalhos', fim_trabalhos);
        return "Atualizado";
    };
    async DeletarHorario(data: FuncionamentoDto): Promise<string>{
        const {id} = data;
        await connection('horarios').where('id', id).delete();
        return 'Deletado';
    };
    async Listar(data: FuncionamentoDto): Promise<object> {
        const {cpf_salao} = data;
        const lista = await connection('horarios').where('cpf_salao', cpf_salao);
        return lista;
    }
}