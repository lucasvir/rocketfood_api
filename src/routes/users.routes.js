const { Router } = require("express");

const userRoutes = Router();

const UserController = require("../controllers/UsersController");
const usersController = new UserController();

userRoutes.post("/", usersController.create);

module.exports = userRoutes;
