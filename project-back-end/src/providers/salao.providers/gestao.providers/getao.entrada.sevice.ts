import {Injectable} from '@nestjs/common';
import {GestaoDto} from './gestao.dto';
import connection from 'src/database/connection';

@Injectable()
export class GestaoEntrada {
    async RelatorioDeEntrada(data: GestaoDto): Promise<object>{
        const {cpf_salao} = data;
        console.log(cpf_salao);
        var result = await connection('agenda').where('cpf_salao', cpf_salao).where('status_servico', 'finalizado').select("*");
        console.log('busca - relatório <><><<><><<',result);
        if(result.length === 0){
            return {resp:"Nada encontrado"};
        };
        console.log('not is empty')
        var quantidade = result.length;
        var valorTotal = 0;
        var indice = 0;
        while (indice < result.length){
            console.log(indice);
            valorTotal = result[indice].preco;
            indice += 1;

        };
        console.log('exit')
        var relatorio = {
            'valorTotal': valorTotal,
            'quantidade': quantidade
        };
        console.log(relatorio);
        return relatorio;
    };
    async RelatorioMes(data: GestaoDto): Promise<object>{
        const {mes, cpf_salao} = data;
        console.log(mes)
        var result = await connection('agenda').where('cpf_salao',cpf_salao).where('mes', mes).where('status_servico', 'finalizado').select('*');
        console.log(result);
        if(result.length === 0){
            return {resp: "Nada encontrado"}
        };
        var quantidade = result.length;
        var valorTotal = 0;
        var indice = 0;
        while(indice < result.length){
            valorTotal += result[indice].preco
        };
        var relatorio = {
            'valorTotal': valorTotal,
            'quantidade': quantidade
        };
        return relatorio;
    };   
    //relatório de entrada anual.
    async RelatorioAno(data : GestaoDto): Promise<object> {
        const {ano, cpf_salao} = data;
        var result = await connection('agenda').where('cpf_salao',cpf_salao).where('ano', ano).where('status_servico', 'finalizado').select('*');
        if(result.length === 0){
            return {resp: "Nada encontrado"}
        };
        var quantidade = result.length;
        var valorTotal = 0;
        var indice = 0;
        for( indice < result.length; indice ++;){
            valorTotal += result[indice].preco;
        };
        var relatorio = {
            'valorTotal': valorTotal,
            'quantidade': quantidade
        };
        return relatorio;
    };
}