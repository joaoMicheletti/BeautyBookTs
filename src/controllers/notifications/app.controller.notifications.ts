import { Body, Controller, Post, Get} from "@nestjs/common";
import { NotificationDto } from "../../../src/providers/notifications/notifications.dto";
import { servicesNotification } from "../../../src/providers/notifications/notifications.services";
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
    async notification(): Promise<string> {
        console.log(WebPush.generateVAPIDKeys());
        return publicKey;
    }
    @Post('/sendNotification')
    async sendNotification(@Body() data:NotificationDto) : Promise<string>{
        return 'ola';
    }
}
