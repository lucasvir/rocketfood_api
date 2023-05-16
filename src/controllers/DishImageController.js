const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImageController {
  async send(req, res) {
    const user_id = req.user.id;
    const { dish_id } = req.params;
    const imgFileName = req.file.filename;

    const diskStorage = new DiskStorage();

    const [dish] = await knex("dishs")
      .where({ user_id })
      .whereLike("id", dish_id);

    if (dish.dish_image) {
      await diskStorage.deleteFile(dish.dish_image);
    }

    const filename = await diskStorage.saveFile(imgFileName);
    dish.dish_image = filename;

    await knex("dishs")
      .update("dish_image", filename)
      .where({ id: dish_id });

    return res.json(dish);
  }
}

module.exports = DishImageController;
