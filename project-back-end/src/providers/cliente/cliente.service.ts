import { Injectable } from "@nestjs/common";
import {ClienteDto} from './cliente.dto'
import connection from "src/database/connection";

@Injectable()
export class Cliente {
    async AgendamentosFuturos(data: ClienteDto): Promise<string>{
        const {cpf_salao, cpf_funcionario, data_atual, dia, mes, ano} = data;
        
        //não veio o dado cpf_saloa;
        if (cpf_salao === undefined) {
            console.log('<><><><><><><',cpf_funcionario)
            const Lista = await connection('funcionarios')
                .where('cpf_funcionario', cpf_funcionario)
                .select('cpf_salao');
            console.log('list <><><>',Lista);
            const SalaoFuncionario = await connection('salao')
                .where('cpf_salao', Lista[0].cpf_salao);
            console.log("salao Funcionario <><><>", SalaoFuncionario);
            var AgeendamentoAte = SalaoFuncionario[0].permitir_agendamento_ate;
            console.log('agendamento ate ><><><>', AgeendamentoAte);
            
            var partes = data_atual.split('/');
            var Dia = parseInt(partes[0], 10);
            var Mes = parseInt(partes[1], 10) - 1;
            var Ano = parseInt(partes[2], 10);
            
            var dataAtual = new Date(Ano, Mes, Dia);
            dataAtual.setDate(dataAtual.getDate() + AgeendamentoAte);
            console.log('data mais soma ',dataAtual);
    
            var dataString = `${ano}/${mes}/${dia}`;
            var DataFormatadaParaServico = new Date(dataString);
    
            if (DataFormatadaParaServico <= dataAtual) {
                return 'Dentro do limite para Agendamentos futuros';
            } else {
                return 'você excedeu o limite de prazo para agendamentos futuros';
            };////    
        } else if (cpf_funcionario === undefined) {
            const Lista = await connection('salao')
                .where('cpf_salao', cpf_salao)
                .select('permitir_agendamento_ate');
    
            var AgeendamentoAte = Lista[0].permitir_agendamento_ate;
    
            var partes = data_atual.split('/');
            var Dia = parseInt(partes[0], 10);
            var Mes = parseInt(partes[1], 10) - 1;
            var Ano = parseInt(partes[2], 10);
    
            var dataAtual = new Date(Ano, Mes, Dia);
            dataAtual.setDate(dataAtual.getDate() + AgeendamentoAte);
    
            var dataString = `${ano}/${mes}/${dia}`;
            var DataFormatadaParaServico = new Date(dataString);
    
            if (DataFormatadaParaServico <= dataAtual) {
                return 'Dentro do limite para Agendamentos futuros';
            } else {
                return 'você excedeu o limite de prazo para agendamentos futuros';
            }
        }
    };
    //função para ver se  a agenda está liberada no horaio e na data;
    async ConsultarEspacoLivreNaAgenda(data: ClienteDto): Promise<string>{
        const {
            cpf_salao, 
            cpf_funcionario,
            dia_semana,
            dia, mes, ano, hora,
            servico,
            preco,
            nome_cliente,  contato_cliente, obs,
            persent50,
            status_servico
        } = data;
        console.log('request horaios livres',data)
        
        //cpf_funcionario não veio no corpo da request.
        if(cpf_funcionario === undefined){
            //buscar no banco de dados o horario de funcionamento do dia.
            const funcionamento = await connection('horarios').where('cpf_salao', cpf_salao).where('dia', dia_semana).select('*');
            if(hora < funcionamento[0].inicio_trabalhos){ //salão não está aberto ainda!.
                return ("Fora do Horário de funcionamento.");
            } else if(hora > funcionamento[0].fim_trabalhos){ // salão já está fechado nessa hora; 
                return ("Fora do Horário de funcionamento.");
            } else if(hora >= funcionamento[0].inicio_trabalhos && hora <= funcionamento[0].fim_trabalhos){// dentro do horário de funcionamento;
                var agendamentos_anteriores = await connection('agenda').where('cpf_salao', cpf_salao)
                .where('dia', dia).where('mes', mes).where('ano', ano).where('hora', '<=', hora).where('hora_termino', '>' ,hora);
                if(agendamentos_anteriores.length === 0){ //não possui conflito com agendamento anterior
                    //evitar conflito com agendamentos já marcados mais a frente.
                    var termino_agendamento_atual = await connection('salao').where('cpf_salao', cpf_salao).select('intervalo_entre_agendamentos');
                    //simplificando a hora.
                    var horas = termino_agendamento_atual[0].intervalo_entre_agendamentos; // Obtém o intervalo entre agenamentos;
                    var hora_termino = horas + hora;
                    var proximo_agendamento = await connection('agenda').where('cpf_salao', cpf_salao)
                    .where('hora', '>', hora).where('hora', '<', hora_termino);
                    if(proximo_agendamento.length === 0){ //nao tem conflito com o proximo agendado
                        return ('agendamento permitido');
                    };
                    return ('conflito entre agendamentos');                
                };
                return ('Horário já ocupado');
            };
        } else if(cpf_salao === undefined){
            console.log(cpf_salao);
            //buscar no banco de dados o horario de funcionamento do dia.
            var info_funcionario = await connection('funcionarios').where('cpf_funcionario', cpf_funcionario).select('*'); 
            const funcionamento = await connection('horarios').where('cpf_salao', info_funcionario[0].cpf_salao).where('dia', dia_semana).select('*');
            console.log('<><><><><', info_funcionario)
            if(hora < funcionamento[0].inicio_trabalhos){ //salão não está aberto ainda!.
                return ("Fora do Horário de funcionamento.");
            } else if(hora > funcionamento[0].fim_trabalhos){ // salão já está fechado nessa hora; 
                return ("Fora do Horário de funcionamento.");
            } else if(hora >= funcionamento[0].inicio_trabalhos && hora <= funcionamento[0].fim_trabalhos){// dentro do horário de funcionamento;
                var agendamentos_anteriores = await connection('agenda').where('cpf_funcionario', cpf_funcionario)
                .where('dia', dia).where('mes', mes).where('ano', ano).where('hora', '<=', hora).where('hora_termino', '>' ,hora);
                if(agendamentos_anteriores.length === 0){ //não possui conflito com agendamento anterior
                    //evitar conflito com agendamentos já marcados mais a frente.
                    var termino_agendamento_atual = await connection('salao').where('cpf_salao', info_funcionario[0].cpf_salao).select('intervalo_entre_agendamentos');
                    //simplificando a hora.
                    var horas = termino_agendamento_atual[0].intervalo_entre_agendamentos; // Obtém o intervalo entre agenamentos;
                    var hora_termino = horas + hora;
                    var proximo_agendamento = await connection('agenda').where('cpf_funcionario', cpf_funcionario)
                    .where('hora', '>', hora).where('hora', '<', hora_termino);
                    if(proximo_agendamento.length === 0){ //nao tem conflito com o proximo agendado
                        return ('agendamento permitido');
                    } else {
                        return ('conflito entre agendamentos');
                    };
                };
                return ('Horário já ocupado');
            };
        };
    };
    //função para criar o agendamento;
    async CriarAgendamento(data: ClienteDto): Promise<object>{
        //conferir se o horário não foi preenchido antes de ralmente agendar;
        const  {
            cpf_salao,
            cpf_funcionario,
            dia,
            mes,
            ano,
            hora,
            servico,
            preco,
            nome_cliente,
            contato_cliente,
            obs,
            persent50,
            status_servico
        } = data;
        console.log('data criar ag ',data);
        //agendar para salão ...
        if(cpf_funcionario === undefined){
            var termino = await connection('salao').where('cpf_salao', cpf_salao).select('intervalo_entre_agendamentos');
            
            //simplificando a hora.
            var horas = Math.floor(termino[0].intervalo_entre_agendamentos / 60); // Obtém a parte inteira das horas
            var minutosRestantes = termino[0].intervalo_entre_agendamentos % 60; // Obtém os minutos restantes
            var valorFormatado = horas + "." + minutosRestantes.toFixed(2);
            var hora_termino = parseFloat(valorFormatado) + hora;
            console.log("HORA TERMino ><><><><><><><><><= ", hora_termino);
            
            const Data =  {
                cpf_salao,
                cpf_funcionario,
                dia,
                mes,
                ano,
                hora,
                hora_termino,
                servico,
                preco,
                nome_cliente,
                contato_cliente,
                obs,
                status_servico
            };
            var conf = await connection('agenda').insert(Data);
            return (conf);
        }else if(cpf_salao === undefined){ //agendar para funcionário ...
            var info_funcionario = await connection('funcionarios').where('cpf_funcionario', cpf_funcionario).select('*');
            
            var termino = await connection('salao').where('cpf_salao', info_funcionario[0].cpf_salao).select('intervalo_entre_agendamentos');
            //simplificando a hora.
            var horas : number = termino[0].intervalo_entre_agendamentos;
            var hora_termino = horas + hora;
            console.log('criaragendamento >>> ', hora_termino);
            const Data =  {
                cpf_salao: info_funcionario[0].cpf_salao,
                cpf_funcionario,
                nome_completo: info_funcionario[0].nome_completo,
                dia,
                mes,
                ano,
                hora,
                hora_termino,
                servico,
                preco,
                nome_cliente,
                contato_cliente,
                obs,
                status_servico
            };
            var conf = await connection('agenda').insert(Data);
            return (conf);
        };
    };
    //listar os horarios já preenchidos.
    async HorariosPreenchidos(data: ClienteDto): Promise<object>{
        const {cpf_salao, cpf_funcionario, dia, mes, ano} = data;
        //não veio o dado cpf_salao;
        if(cpf_funcionario === undefined){
            const Lista = await connection('agenda').where('cpf_salao', cpf_salao)
            .where('dia', dia).where('mes', mes).where('ano', ano).where('status_servico', 'agendado');
            return (Lista);
        } else if(cpf_salao === undefined){ //trabalhando com o cpf_funcionario;
            const Lista = await connection('agenda').where('cpf_funcionario', cpf_funcionario)
            .where('dia', dia).where('mes', mes).where('ano', ano).where('status_servico', 'agendado')
            .select('*');
            return (Lista);
            //não veio o dado Cpf_funcionario   
        };
    };
    
    //função para listar serviços finalizados;
    //async servicosFinalizados(data: ClienteDto): Promise<string>{
     //   console.log('serviços finalizados');
   // };
    //função para atualizar o status do cerviço para cancelar;
    async UpdateStatusServicoCancelar(data: ClienteDto): Promise<string>{
        const {id} = data;
        const lista = await connection('agenda').where('id', id).update('status_servico', 'cancelado');
        return 'Serviço finalizado';
    };
    //função para atualizar o status do serviço para finalizado;
    async UpdateStatusServicoFinalizar(data: ClienteDto): Promise<string>{
        const {id} = data;
        console.log('id><><><><><><><><><><><><><><><><><><<><>', id);
        const lista = await connection('agenda').where('id', id).update('status_servico', 'finalizado');
        console.log(lista);
        return ('Serviço finalizado');  
    };
}