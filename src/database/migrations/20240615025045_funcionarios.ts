import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('funcionarios', function(table){
        table.increments();
        table.integer('cpf_salao').notNullable();
        table.string('nome_completo').notNullable();
        table.integer('cpf_funcionario').notNullable();
        table.integer('foto_fincionario');
        table.string('senha').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('funcionarios');
  
}

