import { Inject, Injectable } from "@nestjs/common";
import { CpanelDto } from "./cpanel.dto";
import connection from "../../database/connection";

@Injectable()
export class Cpanel {
    async CpanelSenha(data:CpanelDto): Promise<string>{
        const {senha, cpf} = data;
        await connection('salao').where('cpf_salao', cpf).select('*').update('senha', senha);
        return 'sucesso';
    };
    //editar plano;
    async EditarPlano(data :CpanelDto): Promise<string>{
        const {plano, cpf} = data;
        var result = await connection('salao').where('cpf_salao', cpf).select('*').update('plano', plano);
        return 'sucesso';
    };
    async EditarAssinatura(data: CpanelDto): Promise<string>{
        const {assinatura, cpf} = data;
        await connection('salao').where('cpf_salao', cpf).select('*').update('assinatura', assinatura);
        return 'sucesso';
    };
    async EditarAssinaturaStatus(data: CpanelDto): Promise<string>{
        const {cpf, assinatura_status} = data;
        await connection('salao').where('cpf_salao', cpf).select('*').update('assinatura_status', assinatura_status);
        return 'sucesso'
    };
    async DataInicio(data: CpanelDto): Promise<string>{
        const {data_inicio_plano, cpf} = data;
        await connection('salao').where('cpf_salao', cpf).select('*').update('data_inicio_plano', data_inicio_plano);
        return 'sucesso'
    };
    async DataFim(data: CpanelDto): Promise<string>{
        const {data_vencimento_plano, cpf} = data;
        await connection('salao').where('cpf_salao', cpf).select('*').update('data_vencimento_plano', data_vencimento_plano);
        return 'sucesso';
    };
    async FuncionarioLimite(data: CpanelDto): Promise<string>{
        const {limite_funcionarios, cpf} = data;
        await connection('salao').where('cpf_salao', cpf).select("*").update('limite_funcionarios', limite_funcionarios);
        return 'sucesso';
    };
    //logar
    async Logar(data :CpanelDto): Promise<object>{
        const {user, pass} = data;
        var cUser = await connection('adm').where('user', user).select('user');
        if(cUser.length > 0){
            var cPass = await connection('adm').where('user', user).select('pass');
            if(cPass.length > 0){
                if(cPass[0].pass === pass){
                    return {user, pass};
                } else{
                    return {resp:'Erro no login'};
                };                
            } else {
                return {resp:'Erro no login'};
            }
        } else {
            return {resp:'Erro no login'};
        }
    };
    //cadastro do adm  será via postman ou insomnia;
    async AdmCad(data :CpanelDto): Promise<object>{
        const {user, pass} = data;
        var conf = await connection('adm').where('user', user);
        if(conf.length > 0){
            return {resp: "usuário ja cadastrado"};
        } else if (conf.length === 0){
            var Data = {user, pass};
            var cad = await connection('adm').insert(Data);
            if(cad.length > 0){
                return {resp:'sucesso'};
            } else{
                return {resp: "erro no processo"};
            };
        };
    };  
};