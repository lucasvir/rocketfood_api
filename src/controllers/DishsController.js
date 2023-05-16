const knex = require("../database/knex");

class DishsController {
  async create(req, res) {
    const { title, description, category, ingredients, price } =
      req.body;
    const user_id = req.user.id;

    const [dish_id] = await knex("dishs").insert({
      user_id,
      title,
      category,
      description,
      price,
    });

    const ingredientsAll = ingredients.map((ingredient) => {
      return {
        dish_id,
        user_id,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsAll);

    return res.json(dish_id);
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishs").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return res.json({
      ...dish,
      ingredients,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("dishs").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, ingredients } = req.query;
    const user_id = req.user.id;

    let dishs;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient);

      dishs = await knex("ingredients")
        .select([
          "dishs.id",
          "dishs.user_id",
          "dishs.title",
          "dishs.price",
        ])
        .where("dishs.user_id", user_id)
        .whereLike("dishs.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("dishs", "dishs.id", "ingredients.dish_id")
        .orderBy("dishs.title");
    } else if (title) {
      dishs = await knex("dishs")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    } else {
      dishs = await knex("dishs").where({ user_id });
    }

    const userIngredients = await knex("ingredients").where({
      user_id,
    });

    const dishsWithIngredients = dishs.map((dish) => {
      const dishIngredients = userIngredients.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return res.json(dishsWithIngredients);
  }
}

module.exports = DishsController;
