"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutoSchema extends Schema {
  up() {
    this.create("produtos", table => {
      table.increments();
      table.string("nome");
      table.string("slug");
      table.double("preco");
      table.double("descricao");
      table.boolean("vendido").defaultTo(false);
      table.integer("user_id").unsigned();
      table.timestamps();

      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutoSchema;
