import { Injectable, Body } from "@nestjs/common";
import { NotificationDto } from "./notifications.dto";
import connetion from "../../../src/database/connection";

@Injectable()
export class servicesNotification {
    async notification(data : NotificationDto): Promise<object> {
        var fullDateInit = data;
        return {fullDateInit}
    };
    async checkSubscription(@Body() body: any) {
        const { endpoint, keys } = body.subscription;

        const exists = await connetion('notifications')
            .where('endPoint', endpoint)
            .first();

        if (exists) {
            // Já temos a assinatura registrada — tudo certo
            return { status: 'ok', message: 'Assinatura já existente' };
        }

        // Não encontrada — talvez expirou ou seja nova
        return { status: 'not_found' };
    }
};