const knex = require("../database/knex");

class DishsController {
  async create(req, res) {
    const { title, description, category, ingredients, price } =
      req.body;
    const user_id = req.user.id;

    const addIngredient = ingredients.join(", ");

    const [dish_id] = await knex("dishs").insert({
      user_id,
      title,
      category,
      ingredients: addIngredient,
      description,
      price,
    });

    return res.json(dish_id);
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishs").where({ id });

    return res.json(dish);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("dishs").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, ingredients } = req.query;

    let dishs;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient);

      dishs = await knex("dishs")
        .whereLike("title", `%${title}%`)
        .whereIn("ingredients", filterIngredients)
        .orderBy("title");
    } else if (title) {
      dishs = await knex("dishs")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    } else {
      dishs = await knex("dishs");
    }

    return res.json(dishs);
  }

  async update(req, res) {
    let { title, description, category, ingredients, price } =
      req.body;
    const { dish_id } = req.params;
    const [dish] = await knex("dishs").where({ id: dish_id });

    const addIngredient = ingredients.join(", ");

    title = title ? title : dish.title;
    category = category ? category : dish.category;
    ingredients = ingredients ? addIngredient : dish.ingredient;
    description = description ? description : dish.description;
    price = price ? price : dish.price;

    const updatedDish = {
      title,
      category,
      ingredients,
      description,
      price,
    };

    await knex("dishs").where({ id: dish_id }).update(updatedDish);

    return res.json(updatedDish);
  }
}

module.exports = DishsController;
