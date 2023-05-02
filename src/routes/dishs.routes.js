const { Router } = require("express");

const dishRoutes = Router();

const DishsController = require("../controllers/DishsController");
const dishsController = new DishsController();

dishRoutes.post("/:user_id", dishsController.create);
dishRoutes.get("/:id", dishsController.show);
dishRoutes.get("/", dishsController.index);
dishRoutes.delete("/:id", dishsController.delete);

module.exports = dishRoutes;
