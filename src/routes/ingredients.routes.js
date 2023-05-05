const { Router } = require("express");
const ingredientsRoutes = Router();

const IngredientsController = require("../controllers/IngredientsController");
const ingredientsController = new IngredientsController();

const ensureAuth = require("../middlewares/ensureAuth");

ingredientsRoutes.get("/", ensureAuth, ingredientsController.index);

module.exports = ingredientsRoutes;
