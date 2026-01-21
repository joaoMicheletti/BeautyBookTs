import { Body, Controller, Post, Get, HttpCode} from "@nestjs/common";
import { NotificationDto } from "../../../src/providers/notifications/notifications.dto";
import { servicesNotification } from "../../../src/providers/notifications/notifications.services";
import  connection  from "../../../src/database/connection";
import * as WebPush from 'web-push';

const publicKey = 'BApBlBKwmELlm6zb0qpH7mop1lhCAFLhKkd3FzntlqyBuXnV8K84Yjrql_6uhO2Vze5C0XXPChcp5l3nAaNGO7U';
const privateKey = 'h1LguolurvvR5PjKX01JPiUYzitJkq5OOh357EkIRJA';
WebPush.setVapidDetails(
    'https://localhost:3000',  // Email de contato
    publicKey,                  // Sua chave pública
    privateKey                  // Sua chave privada
  );


@Controller()
export class NotificationController {
    constructor(private readonly serviceNotification: servicesNotification) {}

    @Get('/publickkey')
    //chave de autenticação para gerar as subscriptions.
    async notification(): Promise<string> {
        console.log("chaves",WebPush.generateVAPIDKeys());
        return publicKey;
    }
    // verificar e registrar subscriptions.
    @Post('notifications/check')
    async checkSubscription(@Body() body: any) {
        console.log('body:',body.subscription.keys)
        // verificar se temos essa subcription registrada.
        let dataToInsert = {
            idUser: body.idUser,
            typeUser: "salao",
            endPoint: body.subscription.endpoint,
            auth: body.subscription.keys.auth,
            p256dh: body.subscription.keys.p256dh
        }
        let verificar = await connection('notifications').where("idUser", body.idUser).select("*");
        console.log(verificar);
        if(verificar.length === 0){
            //registramos essa chave no banco de dados.
            
            console.log("estrutura para salvar", dataToInsert)
            let save = await connection('notifications').insert(dataToInsert);
            console.log(save);
        } else if ( verificar.length > 0){
            let update = await connection('notifications').where("idUser", body.idUser)
            .update("endPoint", dataToInsert.endPoint)
            .update("auth", dataToInsert.auth)
            .update("p256dh", dataToInsert.p256dh);
            console.log(update)

        }
        
        /*if (verificar.length === 0) {
            //registramos essa chave no banco de dados.
            let dataToInsert = {
                idUser: body.idUser,
                typeUser: "salao",
                endPoint: body.subscription.endpoint,
                auth: body.subscription.keys.auth,
                p256dh: body.subscription.keys.p256dh
            }
            console.log("estrutura para salvar", dataToInsert)
            let save = await connection('notifications').insert(dataToInsert);
            console.log(save);
        };*/
    };
    // enviar notificação.
    @Post('/sendNotification')
    async sendNotification(@Body() data: any) {
        // receber os dados da notificação.
        console.log("dados para  montar a notificação.",data);
        let corpo = `Novo agendamento de ${data.nome}, para o dia ${data.data} às ${data.hora}`;
        // registrar notificação no database.
        let insertData = {
            token: data.idUser,
            corpoNotification: corpo,
            status: "notificado"
        }
        console.log(insertData);
        let registerNotificatin = await connection('notificationArea').insert(insertData)
        console.log(registerNotificatin);
        // pegar o endpoint do destinatario.
        let trajeto = await connection('notifications').where('idUser', data.idUser).select("*");
        console.log("trajetos:>>>>>>",trajeto.length);
        // enviar notificação.
        let contador = 0;
        while (contador < trajeto.length){
            const subscription = {
                endpoint: trajeto[contador].endPoint,
                keys: {
                    p256dh: trajeto[contador].p256dh,
                    auth: trajeto[contador].auth
                }
            };
            WebPush.sendNotification(subscription, corpo)
                    .then(() => {
                        // Se a notificação for enviada, verificamos e registramos a assinatura
                        console.log("Mensaguem enviada");
                    })
            console.log(subscription);
            contador += 1;

        }
        
        return {Data: data};
    }
    // rotas para apresentação de notificação no front:
    @Post('/buscarnotifications')
    async getNotifications(@Body() data: any) {
        let lista = await connection("notificationArea").where('token', data.token).where("status", "notificado");
        return lista;
    };
    @Post('/checkNotifications')
    async checkNotification(@Body() data: any){
        console.log(data)
        await connection('notificationArea').where('id', data.id).update('status', 'check');
        return {};
    }
    // dar check nas notificações.
}
