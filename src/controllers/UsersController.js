const AppError = require("../utils/AppError");

class UsersController {
  create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError("Nome é obrigatório!");
    }

    const response = res.status(201).json({ name, email, password });
    return response;
  }
}

module.exports = UsersController;
