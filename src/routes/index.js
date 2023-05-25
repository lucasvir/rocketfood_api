const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishsRouter = require("./dishs.routes");
const sessionsController = require("./sessions.routes");
// const ingredientsRouter = require("./ingredients.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsController);
routes.use("/dishs", dishsRouter);
// routes.use("/ingredients", ingredientsRouter);

module.exports = routes;
