const ensureAuth = require("../middlewares/ensureAuth");
const uploadConfig = require("../configs/upload");

const { Router } = require("express");
const dishRoutes = Router();

const multer = require("multer");
const upload = multer(uploadConfig.MULTER);

const DishsController = require("../controllers/DishsController");
const dishsController = new DishsController();

const DishImageController = require("../controllers/DishImageController");
const dishImageController = new DishImageController();

dishRoutes.use(ensureAuth);

dishRoutes.post("/", dishsController.create);
dishRoutes.get("/:id", dishsController.show);
dishRoutes.get("/", dishsController.index);
dishRoutes.delete("/:id", dishsController.delete);
dishRoutes.put("/:dish_id", dishsController.update);
dishRoutes.patch(
  "/image/:dish_id",
  upload.single("image"),
  dishImageController.send
);

module.exports = dishRoutes;
