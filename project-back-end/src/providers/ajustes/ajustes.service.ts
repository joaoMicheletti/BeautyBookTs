import {Injectable} from '@nestjs/common';
import { AjustesDto, UploadImagemDto } from './ajustes.dto';
import connection from 'src/database/connection';

@Injectable()
export class Ajustes {
    async AdicionarImagem(uploadImagemDto :UploadImagemDto): Promise<object>{
        const logo_salao = uploadImagemDto; // receber um arquivo
        return {res :logo_salao};//.filename}; // nao esquecer de auterar para retornar para o front o filename do arquivo
    };
    //salvando o nome da img no banco de dados junto ao seu salão 
    async LogoSalao(data : AjustesDto): Promise<object>{
        const {logo_salao, cpf_salao} = data;
        console.log("logo salao e cpf <><><><><><><><:><><><<><><><", logo_salao, cpf_salao);
        const list = await connection('salao').where('cpf_salao', cpf_salao)
        .update('logo_salao', logo_salao);
        return {list};
    };
    // funçao para definir o tempo entre um agendamento e outro ;
    async IntervaloAgendamento(data : AjustesDto): Promise<string>{
        const {cpf_salao, intervalo_entre_agendamentos} = data;
        await connection('salao').where('cpf_salao', cpf_salao)
        .update('intervalo_entre_agendamentos', intervalo_entre_agendamentos);
        return 'Intervalo definido!';        
    };
    //função que define no banco de dados "no perfil do salão " que o usuário nao pode agendar em cima da hora;
    async EmCimaDaHora(data : AjustesDto): Promise<string>{
        const {cpf_salao, agendamento_apos_hora_atual} = data;
        await connection('salao').where('cpf_salao', cpf_salao)
        .update('agendamento_apos_hora_atual', agendamento_apos_hora_atual);
        return 'Definido!';
    };
    //função que permite que o usuário marque um agendamento até xxx dias apartir da data atual.
    async AgendamentoAte(data : AjustesDto): Promise<string>{
        const {cpf_salao, permitir_agendamento_ate} = data;
        await connection('salao').where('cpf_salao', cpf_salao)
        .update('permitir_agendamento_ate', permitir_agendamento_ate);
        return 'Definido!';
    };
    //editar senha salão;
    async SenhaSalao(data : AjustesDto): Promise<string>{
        const {cpf_salao, senha} = data;
        const list = await connection('salao').where('cpf_salao', cpf_salao)
        .update('senha', senha);
        return'Atualizado...';
    };
    // editar cadstro salão;
    async EditarSalao(data : AjustesDto): Promise<string>{
        const {
            cpf_salao,
            nome_salao,
            endereco,
            cep,
            email
        } = data;

        await connection('salao').where('cpf_salao', cpf_salao)
        .update('nome_salao', nome_salao)
        .update('endereco', endereco)
        .update('cep', cep)
        .update('email', email);
        return 'Atualizado!.';

    };
    // editar senha funcionário;
    async SenhaFuncionario(data : AjustesDto): Promise<object>{
        const {cpf_salao, cpf_funcionario, senha} = data;
        const list = await connection('funcionarios').where('cpf_salao', cpf_salao).where('cpf_funcionario', cpf_funcionario)
        .update('senha', senha);
        return list;
    };

}