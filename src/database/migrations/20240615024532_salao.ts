import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('salao', function(table){
        table.increments();
        table.string('logo_salao'); //ok
        table.string('nome_salao').notNullable(); // ok
        table.integer('cpf_salao').notNullable(); // ok
        table.string('endereco').notNullable(); // ok
        table.integer('cep').notNullable(); //ok
        table.string('email').notNullable(); //ok
        table.string('senha').notNullable(); //ok
        table.string('plano'); //ok
        table.integer('assinatura'); //ok
        table.date('data_inicio_plano'); //ok
        table.date('data_vencimento_plano'); //ok
        table.integer('quantidade_funcionarios'); //ok
        table.integer('limite_funcionarios'); //ok
        table.string('assinatura_status'); //ok
        table.date('data_cadastro').notNullable(); //ok
        table.integer('dias_free').notNullable(); //ok
        table.integer('codigo_indicacao').notNullable(); //ok
        table.string('indicado_por'); //ok
        table.integer('intervalo_entre_agendamentos'); //ok
        table.integer('agendamento_apos_hora_atual'); //ok
        table.integer('permitir_agendamento_ate'); //ok
        table.string('pendente'); //implentando;
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('salao');
}

