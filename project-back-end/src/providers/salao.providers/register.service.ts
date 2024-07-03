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
      indicado_por,
        data_cadastro,
    } = data;
    console.log(data);

    
    //verificar se o salao ja esta cadastrado
    const verificar = await connection('salao').where('cpf_salao', cpf_salao).select('*');
    
    if (verificar.length > 0){
      console.log('>>>>>',verificar.length)
      return "salão já cadastrado";
    } else if(verificar.length === 0) {
      // Gerar código de indicação aleatório
      const codigo_indicacao = cpf_salao.slice(-4);  
      // Inserir os dados no banco de dados
      var dias_free = 7;
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
      
      console.log('<><><><>',insertedData);
        return "cadastrado com sucesso!";
    } else {
        return "Erro interno";
      };
  };
  async ListarSalao(data: SalaoRegisterDto): Promise<object>{
    const {cpf_salao} = data;
    const Lista = await connection('salao').select('*');
    return Lista;
  };
   //buscar um salao expecifico;
  async Salao(data : SalaoRegisterDto): Promise<object>{
    const {cpf_salao} = data;
    console.log(cpf_salao, 'salao <:><><><><>')
    var lista = await connection('salao').where('cpf_salao', cpf_salao).select('*');
    console.log(lista);
    return lista;
  };
};