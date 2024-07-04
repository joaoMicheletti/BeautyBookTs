import { Injectable } from "@nestjs/common";
import { GestaoDto } from "./gestao.dto";
import connection from "src/database/connection";

@Injectable()
export class Gestao {
    async FinalizadosDiarios(data : GestaoDto): Promise<object> {
        const  {cpf_salao} = data;
        console.log("finalizado diarios <><><><><>_", cpf_salao);
        var DATA = new Date();
        var dia = DATA.getDate();
        var mes = DATA.getMonth();
        console.log(mes)
        var ano = DATA.getFullYear();
        var quantiFinalinado = await connection('agenda').where('cpf_salao', cpf_salao)
        .where('dia', dia).where('mes', mes + 1).where('ano', ano).where('status_servico', 'finalizado').select('*');
        console.log('bruto finalizado diario >>>>', quantiFinalinado);
        var finalizado = quantiFinalinado.length;
        var total = 0;
        var loop = 0;
        while (loop < quantiFinalinado.length){
            total += quantiFinalinado[loop].preco;
            loop ++;
        }
        return{finalizado, total};
    };
    async Cancelados(data: GestaoDto): Promise<object> {
        const {cpf_salao} = data;
        var DATA = new Date();
        var dia = DATA.getDate();
        var mes = DATA.getMonth();
        var ano = DATA.getFullYear();
        
        
        var quantFinalizado = await connection('agenda').where('cpf_salao', cpf_salao)
        .where('dia', dia).where('mes',mes + 1).where('ano', ano).where('status_servico', 'cancelado').select('*');
        var finalizado = quantFinalizado.length;
        var total = 0;
        var loop = 0;
        while (loop < quantFinalizado.length){
            total += quantFinalizado[loop].preco;
            loop ++;
        };
        return {finalizado, total};
    };
    
};