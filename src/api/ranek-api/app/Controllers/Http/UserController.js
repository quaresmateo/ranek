/* eslint-disable no-undef */
"use strict";
const User = use("App/Models/User");
class UserController {
  async create({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
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
      console.log(e);
      return response.status(400).json({
        status: "error",
        message: "Email/Senha inválidos."
      });
    }
  }
}

module.exports = UserController;
