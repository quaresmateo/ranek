/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Produto = use("App/Models/Produto");
const User = use("App/Models/User");
const Database = use("Database");

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, request, params }) {
    let { page, _limit } = request.all();
    page = page ? page : 1;
    _limit = _limit ? _limit : 9;
    const produtos = await Database.from("produtos")
      .query()
      .where(function() {
        const q = this.where("*", params.q);
        return q;
      })
      .paginate(page ? page : 1, _limit);

    return response.json({ produtos });
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const user_id = auth.user.id;
    const user = await User.find(user_id);
    const produto = await user.produtos().create({
      ...request.only(["nome", "descricao", "preco"])
    });

    return response.status(200).json({
      message: "Produto criado com sucesso!",
      data: produto
    });
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const produto = await Produto.findByOrFail("slug", params.id);
    return response.status(200).json({ produto });
  }

  /**
   * Render a form to update an existing produto.
   * GET produtos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ProdutoController;
