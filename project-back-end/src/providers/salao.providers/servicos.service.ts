import { Injectable } from "@nestjs/common";
import  {ServicosRegisterDto} from '../../providers/salao.providers/servicos-register.dot';
import connection from "src/database/connection";
@Injectable()
export class Servicos {
    async Register(data: ServicosRegisterDto): Promise<string>{
        const  {
            cpf_salao, servico, preco
        } = data;
        var Data = {cpf_salao, servico, preco};
        await connection('servicos').insert(Data);
                
        return"serviço Cadastrado!";
    }
}