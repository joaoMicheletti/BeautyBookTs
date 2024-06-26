import { Body, Post, Controller } from "@nestjs/common";
import {Login} from '../../providers/salao.providers/login.service';
import { LoginDto } from "../../providers/salao.providers/login.salao.dto";

@Controller()
export class LoginController{
    //contrutor
    constructor(private readonly login: Login){};

    @Post('/loginsalao')
    async LoginSalao(@Body() data: LoginDto): Promise<object>{
        return await this.login.LoginSalao(data);
    };
    @Post('/assinatura')
    async StatusAssinatura(@Body() data:LoginDto): Promise<object> {
        return await this.login.StatusAssinatura(data);
    }
}