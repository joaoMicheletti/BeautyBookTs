import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('servicos', function(table){
        table.increments();
        table.integer('cpf_salao').notNullable();
        table.string('servico').notNullable();
        table.integer('tempo');
        table.float('preco').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('servicos');
}

