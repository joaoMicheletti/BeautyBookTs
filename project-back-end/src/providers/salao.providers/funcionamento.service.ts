import { Injectable } from "@nestjs/common";
import {FuncionamentoDto} from './horario-funcionamento.dts';
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

}