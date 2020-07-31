"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */

// eslint-disable-next-line no-undef
const Schema = use("Schema");

class TransacoesSchema extends Schema {
  up() {
    this.create("transacoes", table => {
      table.increments();
      table
        .integer("comprador_id")
        .unsigned()
        .notNullable();
      table
        .integer("vendedor_id")
        .unsigned()
        .notNullable();
      table
        .integer("produto_id")
        .unsigned()
        .notNullable();
      table
        .integer("endereco_id")
        .unsigned()
        .notNullable();

      table
        .foreign("comprador_id")
        .references("users.id")
        .onDelete("cascade");
      table
        .foreign("vendedor_id")
        .references("users.id")
        .onDelete("cascade");
      table
        .foreign("produto_id")
        .references("produtos.id")
        .onDelete("cascade");
      table
        .foreign("endereco_id")
        .references("enderecos.id")
        .onDelete("cascade");

      table.timestamps();
    });
  }

  down() {
    this.drop("transacoes");
  }
}

module.exports = TransacoesSchema;
