import { Injectable } from '@nestjs/common';
import { SdkMercadopagoDto } from './sdkMp.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class SdkMp {
    async Preferenceid(data: SdkMercadopagoDto): Promise<object> {
        // Adicione as credenciais
        const client = new MercadoPagoConfig({ accessToken: 'APP_USR-8723383960512742-032820-a2fe03f8211f0538df7bb3b7177ebc42-294751990' });
        const { plano, quantidade, preco, x } = data;
        let Preco = 0;
        if (plano === 'plano individual') {
            Preco += 50;
        } else if (plano === "plano personalizado") {
            Preco += (parseInt(x) * 50);
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
                            "unit_price": parseFloat(preco)
                        }
                    ],
                    "back_urls": {
                        "success": "https://www.seu-site/success",
                        "failure": "http://www.seu-site/failure",
                        "pending": "http://www.seu-site/pending"
                    },
                    "auto_return": "approved",
                }
            });
            return { id: response.id };
        } catch (error) {
            console.log(error);
            throw new Error('Erro ao criar a preferência de pagamento');
        }
    }
};
