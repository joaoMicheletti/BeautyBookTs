import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('agenda', function(table){
        //caso sejá referente à agenda do salão o cpf_salao estara preenchido, vice e verça.
        table.increments();
        table.integer('cpf_salao');
        table.integer('cpf_funcionario');
        table.string('nome_completo');
        table.integer('dia').notNullable();
        table.integer('mes').notNullable();
        table.integer('ano').notNullable();
        table.float('hora').notNullable();
        table.string('servico').notNullable();
        table.float('preco').notNullable();
        table.float('hora_termino');
        table.string('nome_cliente').notNullable();
        table.integer('contato_cliente').notNullable();
        table.string('obs').notNullable();
        table.string('percente50');
        table.string('status_servico').notNullable();

    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('agenda');
}

