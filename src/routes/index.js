const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishsRouter = require("./dishs.routes");
const sessionsController = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsController);
routes.use("/dishs", dishsRouter);

module.exports = routes;
