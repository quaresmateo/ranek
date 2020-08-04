"use strict";
// eslint-disable-next-line no-undef
const Database = use("Database");

class TransacaoController {
  async index({ response, request, auth }) {
    const { order, tipo } = request.all();
    const user = await auth.getUser();

    const transactions = await Database.table("transacoes")
      .orderBy("created_at", order ?? "asc")
      .where(tipo, user.id);

    const endereco = {
      rua: user.rua,
      cep: user.cep,
      numero: user.numero,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado
    };

    transactions.endereco = { ...endereco };

    return response.json({ transactions });
  }

  async store({ response, resquest }) {
    const data = {
      ...resquest.only(["comprador_id", "vendedor_id", "produto_id"])
    };

    const transactions = await Database.table("transacoes").insert(data);

    return response.json({ transactions });
  }
}

module.exports = TransacaoController;
