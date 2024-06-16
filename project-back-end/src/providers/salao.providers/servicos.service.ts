import { Body, Injectable } from "@nestjs/common";
import { ServicosRegisterDto } from '../../providers/salao.providers/servicos-register.dot';
import connection from "../../database/connection";

@Injectable()
export class Servicos {
  async Register(data: ServicosRegisterDto): Promise<string> {
    const {
      cpf_salao, servico, preco
    } = data;

    var Data = { cpf_salao, servico, preco };

    try {
      await connection('servicos').insert(Data);
      return "Serviço cadastrado!";
    } catch (error) {
      console.error('Error registering service:', error);
      throw new Error('Failed to register service.');
    }
  };
  async Listar(data: ServicosRegisterDto): Promise<object> {
    const {cpf_salao} = data;
    try {
      const List = await connection('servicos').where('cpf_salao', cpf_salao).select("*");
      return List;    
    } catch (error) {
      console.error('Error registering service:', error);
      throw new Error('Failed to register service.');      
    }
  };
  async EditarServico(@Body() data: ServicosRegisterDto): Promise<string> {
    const {id, preco} = data;
    await connection('servicos').where('id', id).update('preco', preco);
    return "Editado";
  };
  async Delete(data: ServicosRegisterDto): Promise<string> {
    const {id} = data;
    await connection('servicos').where('id', id).delete();
    return "Deletado";
  
  }
}
