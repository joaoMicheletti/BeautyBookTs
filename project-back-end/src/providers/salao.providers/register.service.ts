import { Injectable } from '@nestjs/common';
import { SalaoRegisterDto } from './salao-register.dto';
import connection from '../../database/connection';

@Injectable()
export class SalaoRegister {
  async Register(data: SalaoRegisterDto): Promise<string> {
    const {
      cpf_salao,
      nome_salao,
      endereco,
      cep,
      email,
      senha,
      data_cadastro,
      indicado_por,
      dias_free,
    } = data;

    try {
      //verificar se o salao ja esta cadastrado
      const verificar = await connection('salao').where('cpf_salao', cpf_salao).select('*');
      if (verificar.length > 0){
        return "salão já cadastrado";
      } else if(verificar.length === 0) {
        // Gerar código de indicação aleatório
        const codigo_indicacao = cpf_salao.slice(-4);  
        // Inserir os dados no banco de dados
        const insertedData = await connection('salao').insert({
          cpf_salao,
          nome_salao,
          endereco,
          cep,
          email,
          senha,
          data_cadastro,
          indicado_por,
          dias_free,
          codigo_indicacao,
          intervalo_entre_agendamentos: 10,
          agendamento_apos_hora_atual: 10,
          permitir_agendamento_ate: 10,
        });
        console.log(insertedData);
        return "cadastrado com sucesso!";
      } else {
        return "Erro interno";
      };
    } catch (error) {
      console.error('Error registering salon:', error);
      throw new Error('Failed to register salon.');
    }
  }
}
