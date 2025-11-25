import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('horarios', function(table){
        table.increments();
        table.integer('cpf_salao').notNullable();
        table.string('dia').notNullable();
        table.float('inicio_trabalhos').notNullable();
        table.float('fim_trabalhos').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('horarios');
}

