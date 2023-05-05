const { Router } = require("express");

const userRoutes = Router();

const UserController = require("../controllers/UsersController");
const usersController = new UserController();

const ensureAuth = require("../middlewares/ensureAuth");

userRoutes.post("/", usersController.create);
userRoutes.put("/", ensureAuth, usersController.update);

module.exports = userRoutes;
