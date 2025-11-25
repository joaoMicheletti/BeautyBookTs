import { Injectable } from "@nestjs/common";
import { NotificationDto } from "./notifications.dto";

@Injectable()
export class servicesNotification {
    async notification(data : NotificationDto): Promise<object> {
        var fullDateInit = data;
        return {fullDateInit}
    };
};