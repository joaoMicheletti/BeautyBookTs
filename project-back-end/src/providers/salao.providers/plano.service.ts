import { Injectable } from "@nestjs/common";
import {AssinaturaPlanoDto} from './plano-update.dto';
import connection from '../../database/connection';


@Injectable()
export class AssinaturaPlano {
    async Assinatura(data: AssinaturaPlanoDto): Promise<object>{
        console.log(data)
        const {
            cpf_salao,
            plano,
            assinatura,
            data_inicio_plano,
            data_vencimento_plano,
            limite_funcionarios,
        } = data;
        var res = await connection('salao').where('cpf_salao', cpf_salao)
        .update('plano', plano)
        .update('assinatura', 'on')
        .update('data_inicio_plano', data_inicio_plano)
        .update('data_vencimento_plano', data_vencimento_plano)
        .update('limite_funcionarios', limite_funcionarios)
        .update('assinatura_status', 'ativa');
        return res;
        // escrever teste assim que a função de pagamento for concluida
    };
}
