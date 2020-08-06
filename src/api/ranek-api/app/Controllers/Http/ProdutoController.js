"use strict";
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Produto = use("App/Models/Produto");
const User = use("App/Models/User");
const Database = use("Database");

class ProdutoController {
  async index({ response, request }) {
    let { page, _limit, q: query, usuario_id } = request.all();

    page = page ?? 1;
    _limit = _limit ?? 9;

    let produtos = query
      ? await Database.from("produtos")
          .where("slug", "like", `%${query}%`)
          .orWhere("preco", "like", `%${query}%`)
          .orWhere("descricao", "like", `%${query}%`)
          .orWhere("vendido", "like", `%${query}%`)
          .paginate(page, _limit)
      : await Database.from("produtos").paginate(page, _limit);

    if (usuario_id) {
      const produtos_usuario = await Database.from("produtos").where(
        "usuario_id",
        usuario_id
      );
      return response.json({ produtos_usuario });
    }

    return response.json({ produtos });
  }

  async store({ request, response, auth }) {
    const usuario_id = auth.user.id;
    const user = await User.find(usuario_id);
    const produto = await user.produtos().create({
      ...request.only(["nome", "descricao", "preco"])
    });

    return response.status(200).json({
      message: "Produto criado com sucesso!",
      data: produto
    });
  }

  async show({ params, response }) {
    const produto = await Produto.findByOrFail("slug", params.id);
    return response.status(200).json({ produto });
  }

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, response }) {
    const produto = await Database.table("produtos").where("id", params.id);
    await produto.delete();
    return reeponse.json({
      message: "Deletado com sucesso!"
    });
  }
}

module.exports = ProdutoController;
