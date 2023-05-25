const AppError = require("../utils/AppError");
const knex = require("../database/knex");

const { hash, compare } = require("bcrypt");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    if (!email) {
      throw new AppError("Digite seu e-mail para cadastro");
    }

    const checkUserExists = await knex("users")
      .where({ email })
      .first();
    if (checkUserExists) {
      throw new AppError("Este email já está em uso");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    const response = res.status(201).json();
    return response;
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const [user] = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const [userWithUpdatedEmail] = await knex("users").where({
      email,
    });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("E-mail já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Informe a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    const userUpdated = {
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    };

    await knex("users").update(userUpdated).where({ id: user_id });

    const response = res.status(202).json();
    return response;
  }
}

module.exports = UsersController;
