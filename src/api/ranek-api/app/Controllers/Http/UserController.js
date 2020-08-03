/* eslint-disable no-undef */
"use strict";
const User = use("App/Models/User");

class UserController {
  async me({ auth }) {
    return auth.getUser();
  }

  async create({ request, response }) {
    const data = request.only([
      "username",
      "email",
      "password",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado"
    ]);

    const user = await User.create(data);

    return response.json(user);
  }

  async login({ request, auth, response }) {
    const { email, password } = request.all();

    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy("email", email);
        const token = await auth.generate(user);
        return response.json({
          data: token,
          message: "Login successfull"
        });
      }
    } catch (e) {
      return response.status(400).json({
        status: "error",
        message: "<strong>Erro</strong>: Email/Senha inválidos."
      });
    }
  }

  async validate({ request, response, auth }) {
    const { email, password } = request.all();
    const res = await auth.attempt(email, password);

    if (res) {
      return response.json({
        code: "jwt_auth_valid_token",
        data: {
          res
        }
      });
    }
  }

  async update({ request, response, auth }) {
    const user = await auth.current.user;
    const data = request.only([
      "username",
      "email",
      "password",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado"
    ]);

    await user.merge(data);
    await user.save();

    return response.status(200).json({
      message: "atualizado com sucesso"
    });
  }
}

module.exports = UserController;
