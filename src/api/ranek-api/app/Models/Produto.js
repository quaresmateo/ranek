"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Produto extends Model {
  static boot() {
    super.boot();

    this.addTrait("@provider:Lucid/Slugify", {
      fields: {
        slug: "nome"
      },
      strategy: "dbIncrement"
    });
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Produto;
