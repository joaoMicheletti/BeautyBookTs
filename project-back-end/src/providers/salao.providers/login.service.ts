import { Injectable } from "@nestjs/common";
import { LoginDto } from './login.salao.dto';
import connection from "../../database/connection";
import axios from 'axios';

@Injectable()
export class Login {
    async LoginSalao(data: LoginDto): Promise<object> {
        const { cpf_salao, senha } = data;
        console.log(cpf_salao);
        const cCpf = await connection('salao').where('cpf_salao', cpf_salao).select('cpf_salao');
        const cSenha = await connection('salao').where('cpf_salao', cpf_salao).select('senha');
        console.log(cCpf.length, cSenha);
        
        if (cCpf.length === 0) { // If zero not have a salon with this "cpf_salao"
            // Search in table employees
            const funcionario = await connection('funcionarios').where('cpf_funcionario', cpf_salao).select('*');
            console.log(funcionario, funcionario.length === 0);
            
            if (funcionario.length === 0) { // Not found employee with this cpf
                console.log('caiu aqui');
                return { res: 'Salão ou funcionário não encontrado!' }
            } else { // Found this employee
                const senha_funcionario = await connection('funcionarios')
                    .where('cpf_funcionario', cpf_salao)
                    .where('senha', senha)
                    .select('senha');
                    
                if (senha_funcionario.length === 0) { // Incorrect password
                    return { res: 'Erro no Login' }
                } else { // Passed login as employee, verify salon subscription status
                    const salao = await connection('funcionarios').where('cpf_funcionario', cpf_salao).select('cpf_salao');
                    const cpfSalao = salao[0].cpf_salao;
                    const status = await connection('salao').where('cpf_salao', cpfSalao).select('assinatura_status');
                    
                    if (status[0].assinatura_status === 'on') {
                        // Employee access granted, return object with cpf_funcionario
                        const Data = { cpf_funcionario: funcionario[0].cpf_funcionario };
                        return Data;
                    } else {
                        // For salons with inactive subscription, employees won't have access
                        return { res: 'Acesso Negado, problemas com à assinatura do plano.' };
                    }
                }
            }
        } else if (cSenha[0].senha !== senha) {
            console.log('senha ><><><><')
            // Incorrect password
            return { res: 'Erro no login' }
        } else { // Passed all checks as a salon
            const status = await connection('salao').where('cpf_salao', cpf_salao).select("*");

            if (status[0].assinatura_status === null) { // Check free trial days
                const dataCadastro = await connection('salao').where('cpf_salao', cpf_salao).select('data_cadastro');
                const dataAtual = new Date();  
                const dataString = dataCadastro[0].data_cadastro;
                const partes = dataString.split('/');
                const dia = parseInt(partes[0], 10);
                const mes = parseInt(partes[1], 10) - 1;
                const ano = parseInt(partes[2], 10);
                const datas = new Date(ano, mes, dia);
                datas.setDate(datas.getDate() + 7);
                const dias_free = dataAtual < datas;

                if (dias_free === true) {
                    const Data = { cpf_salao };
                    console.log(Data, "dias free")
                    return Data;
                } else {
                    return { res: "Dias Free excedidos" };
                }
            } else {
                const pending = await connection('salao').where('cpf_salao', cpf_salao).select('pendente');

                if (pending[0].pendente !== null) {
                    const paymentId = pending[0].pendente;
                    console.log('>>>', paymentId);
                    const YOUR_ACCESS_TOKEN = 'APP_USR-8723383960512742-032820-a2fe03f8211f0538df7bb3b7177ebc42-294751990';
                    const apiUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;
                    const config = {
                        headers: { Authorization: `Bearer ${YOUR_ACCESS_TOKEN}` }
                    };

                    const response = await axios.get(apiUrl, config);
                    const Dados = response.data;

                    if (Dados.status === 'pending') {
                        const statusPagamento = Dados.status;
                        const Data = { cpf_salao, statusPagamento };
                        return Data;
                    } else if (Dados.status === 'approved') {
                        const dataAproved = Dados.date_approved;

                        const terminoPlano = async () => {
                            const resultado = await connection('salao')
                                .where('cpf_salao', cpf_salao)
                                .select('data_vencimento_plano');
                            return resultado[0].data_vencimento_plano;
                        };

                        const processPlano = async () => {
                            try {
                                const dataVencimentoPlano = await terminoPlano();
                                const partes = dataVencimentoPlano.split('/');
                                const diaTermino = parseInt(partes[0], 10);
                                const mesTermino = parseInt(partes[1], 10) - 1;
                                const anoTermino = parseInt(partes[2], 10);
                                const objetoDataDeTerminoDoPlano = new Date(anoTermino, mesTermino, diaTermino);

                                const dataPagamento = new Date(dataAproved);
                                const diaPagamento = dataPagamento.getDate();
                                const mesPagamento = dataPagamento.getMonth();
                                const anoPagamento = dataPagamento.getFullYear();
                                const varTerminoDePlano = diaTermino + '/' + (mesTermino + 1) + '/' + anoTermino;
                                const objetodataDeAprovacaoDePagamento = new Date(anoPagamento, mesPagamento, diaPagamento);

                                if (objetoDataDeTerminoDoPlano < objetodataDeAprovacaoDePagamento) {
                                    const updateInicioDoPlano = async () => {
                                        const objetDataAtual = new Date();
                                        const diaInicioDeplano = objetDataAtual.getDate();
                                        const mesInicioDePlano = objetDataAtual.getMonth() + 1;
                                        const anoInicioDePlano = objetDataAtual.getFullYear();
                                        const varInivioDeplano = diaInicioDeplano + '/' + mesInicioDePlano + '/' + anoInicioDePlano;

                                        await connection('salao').where('cpf_salao', cpf_salao).update('data_inicio_plano', varInivioDeplano);
                                        await connection('salao').where('cpf_salao', cpf_salao).update('data_vencimento_plano', varTerminoDePlano);
                                        await connection('salao').where('cpf_salao', cpf_salao).update('assinatura_status', 'on');
                                        await connection('salao').where('cpf_salao', cpf_salao).update('pendente', null);
                                    };

                                    await updateInicioDoPlano();
                                }

                                const statusPagamento = Dados.status;
                                const Data = { cpf_salao, statusPagamento };
                                return Data;
                            } catch (error) {
                                console.error('Erro ao processar o plano:', error);
                                const statusPagamento = Dados.status;
                                const Data = { cpf_salao, statusPagamento };
                                return Data;
                            }
                        };

                        await processPlano();
                    }

                    const assinatura_status = status[0].assinatura_status;
                    const Data = { cpf_salao, assinatura_status };
                    return Data;
                };
            };
        };
    };
    async StatusAssinatura(data : LoginDto): Promise<object>{
        const {cpf_salao} = data;
       //como essa função vai ser chamada constantemente ela tratara de verificar a data de termino de assinatur e etualizar o status de assinatura;
        //data de vencimento do plano do salão.
        let dataVencimento = await connection('salao').where('cpf_salao', cpf_salao).select('data_vencimento_plano');
        //verificar se os dis free ainda estão liberados.
        if(dataVencimento[0].data_vencimento_plano === null){
            // si for nul não, ainda nao contratou nenum plano, então verificaremos os dis free;
            var dataAtual = new Date();
            var cad = await connection('salao').where('cpf_salao', cpf_salao).select('data_cadastro');
            var partes = cad[0].data_cadastro.split('/');
                var dia = parseInt(partes[0], 10);
                var mes = parseInt(partes[1], 10) - 1; // Os meses em JavaScript são baseados em zero
                var ano = parseInt(partes[2], 10);
                // Criar um objeto de data com os valores obtidos
                var Data = new Date(ano, mes, dia);
                // Adicionar 7 dias ao objeto de data
                Data.setDate(Data.getDate() + 7);
                //salvando na variavel o status dos dias free, true para acesso livre false para acesso livre excedido;
                var dias_free = dataAtual < Data;
                return {res: 'dias_free'}
        }
        // Quebrar a string da data vencimento em dia, mês e ano
        var partes = dataVencimento[0].data_vencimento_plano.split('/');
        var Dia = parseInt(partes[0], 10);
        var Mes = parseInt(partes[1], 10) - 1 ; // Os meses em JavaScript são baseados em zero
        var Ano = parseInt(partes[2], 10);
        const dataVencimentobject = new Date(Ano, Mes, Dia);
        // data Atual;
        const DataAtual = new Date();
        var dia = DataAtual.getDate();
        var mes = DataAtual.getMonth();
        var ano = DataAtual.getFullYear();
        const dataAtualObject = new Date(ano, mes, dia);
        //foi criado dois objetos de data para facilitar na conparação das datas 
        if(dataAtualObject > dataVencimentobject){
            await connection('salao').where('cpf_salao', cpf_salao).update('assinatura_status', 'off');
            return {res: 'null'};
        };
        //busca na base dedados.
        const ass = await connection('salao').where('cpf_salao', cpf_salao).select('assinatura_status');
        return {res:  'on'};
        
    };
};