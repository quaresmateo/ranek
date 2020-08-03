"use strict";
// eslint-disable-next-line no-undef
const Database = use("Database");

class TransacaoController {
  async index({ response, request }) {
    const type = request.all(["tipo"]);
    let transactions = await Database.from("transacoes");

    switch (type) {
      case "vendedor":
        transactions = await Database.from("transacoes").where(
          "vendedor_id",
          type
        );
        break;
    }

    return response.json({
      transactions
    });
  }
}

module.exports = TransacaoController;
