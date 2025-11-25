import { Injectable } from '@nestjs/common';
import { SdkMercadopagoDto } from './sdkMp.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import connection from 'src/database/connection';

@Injectable()
export class SdkMp {
    async Preferenceid(data: SdkMercadopagoDto): Promise<object> {
        console.log(data);
        // Adicione as credenciais
        const client = new MercadoPagoConfig({ accessToken: 'APP_USR-8723383960512742-032820-a2fe03f8211f0538df7bb3b7177ebc42-294751990' });
        const { plano, quantidade, preco, x } = data;
        let Preco = 0;
        if (plano === 'plano individual') {
            console.log(plano)
            Preco += 50;
            console.log(Preco)
        }else if(plano === "plano individual Anoal"){
            Preco +=((parseInt(quantidade) *50)*12)-(((parseInt(quantidade) *50)*12)*0.20);
            console.log(Preco);
        } else if (plano === "plano personalizado") {
            Preco += (parseInt(x) * 50);
            console.log(Preco)
        } else if (plano === "plano personalizado Anoal") {
            Preco += ((parseInt(x) *50)*12)-(((parseInt(x) *50)*12)*0.20);
            console.log(Preco, 'this')
        }
        const preference = new Preference(client);
        try {
            const response = await preference.create({
                body: {
                    "items": [
                        {
                            "id": "item-ID-1234",
                            "title": plano,
                            "currency_id": "BRL",
                            "description": "Descrição do Item",
                            "quantity": 1,
                            "unit_price": Preco
                        }
                    ],
                    "back_urls": {
                        "success": "https://34a8cdfd5e9a.ngrok-free.app/pendente/",
                        "failure": "https://34a8cdfd5e9a.ngrok-free.app/pendente/",
                        "pending": "https://34a8cdfd5e9a.ngrok-free.app/pendente/"
                    },
                    "auto_return": "approved",
                }
            });
            console.log(response.id);
            console.log(response);
            return { id: response.id };
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao criar a preferência de pagamento');
        };
    };
    async BuscarPagamento(data: SdkMercadopagoDto): Promise<object>{
        console.log(data, 'oi');
        const {paymentId} = data;
        const axios = require('axios');
        const YOUR_ACCESS_TOKEN = 'APP_USR-8723383960512742-032820-a2fe03f8211f0538df7bb3b7177ebc42-294751990'; // Substitua pelo seu token de acesso
        const apiUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;
        const config = {
          headers: {
            Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
          },
        };
        try {
            const response = await axios.get(apiUrl, config);
            const Dados = response.data;
        
            if (Dados.status === 'pending') {
              console.log(Dados.status); // status do pagamento pending, failure, success
              const status = Dados.status;
              console.log(status);
              const id = Dados.payment_method.id;
              const Resp = { status, id };
              return Resp;
            } else if (Dados.status === 'approved') {
              const status = Dados.status;
              const description = Dados.description;
              const Data = {
                status,
                description
              };
              console.log(Data);
              return Data;
            } else {
              return { resp: 'recusado' };
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            throw error;
        };
    };
        //função responsável por salvar o pymentId no data base;
        //caso o pagamento sejá pendente, boleto ou pec;
        async Pending(data: SdkMercadopagoDto): Promise<object>{
            console.log(data)
          const {salao, paymentId} = data;
          //inserindo o pymentId no dataBase;
          var verificar = await connection('salao').where('cpf_salao', salao).update('pendente', paymentId);
          console.log(">>>>>>:", salao, ">>>>>>>>>>>",verificar);
          return verificar;
        }
};
