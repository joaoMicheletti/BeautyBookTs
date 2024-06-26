import { Injectable } from "@nestjs/common";
import { LoginDto } from './login.salao.dto';
import connection from "../../database/connection";
import axios from 'axios';

@Injectable()
export class Login {
    async LoginSalao(data: LoginDto): Promise<object> {
        const { cpf_salao, senha } = data;
        const cCpf = await connection('salao').where('cpf_salao', cpf_salao).select('cpf_salao');
        const cSenha = await connection('salao').where('cpf_salao', cpf_salao).select('senha');
        
        if (cCpf.length === 0) { // If zero not have a salon with this "cpf_salao"
            // Search in table employees
            const funcionario = await connection('funcionarios').where('cpf_funcionario', cpf_salao).select('*');
            
            if (funcionario.length === 0) { // Not found employee with this cpf
                return { res: 'Salão ou funcionário não encontrado!' }
            } else { // Found this employee
                const senha_funcionario = await connection('funcionarios')
                    .where('cpf_funcionario', cpf_salao)
                    .where('senha', senha)
                    .select('senha');
                    
                if (senha_funcionario.length === 0) { // Incorrect password
                    return { rep: 'Erro no Login' }
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
                        return { resp: 'Acesso negado. Problemas com assinatura do plano!' };
                    }
                }
            }
        } else if (cSenha[0].senha !== senha) {
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

        return { res: 'Erro na solicitação' };
    };
    async StatusAssinatura(data : LoginDto): Promise<object>{
        const {cpf_salao} = data;
        console.log(cpf_salao);
        return {};
    }
};