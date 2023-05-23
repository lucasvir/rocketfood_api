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

    // const ingredientsAll = ingredients.map((ingredient) => {
    //   return {
    //     dish_id,
    //     user_id,
    //     name: ingredient,
    //   };
    // });

    // await knex("ingredients").insert(ingredientsAll);

    return res.json(dish_id);
  }

  async show(req, res) {
    const { id } = req.params;

    const dish = await knex("dishs").where({ id });
    // const ingredients = await knex("dishs")
    //   .where("ingredients")
    //   .andWhere({ id })
    //   .orderBy("name");

    return res.json(dish);
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

      dishs = await knex("dishs")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .whereIn("ingredients", filterIngredients)
        .orderBy("title");
    } else if (title) {
      dishs = await knex("dishs")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    } else {
      dishs = await knex("dishs").where({ user_id });
    }

    // const userIngredients = await knex("ingredients").where({
    //   user_id,
    // });

    // const dishsWithIngredients = dishs.map((dish) => {
    //   const dishIngredients = userIngredients.filter(
    //     (ingredient) => ingredient.dish_id === dish.id
    //   );

    //   return {
    //     ...dish,
    //     ingredients: dishIngredients,
    //   };
    // });

    return res.json(dishs);
  }

  async update(req, res) {
    let { title, description, category, ingredients, price } =
      req.body;
    // const user_id = req.user.id;
    const { dish_id } = req.params;
    const [dish] = await knex("dishs").where({ id: dish_id });

    title = title ? title : dish.title;
    category = category ? category : dish.category;
    ingredients = ingredients ? ingredients : dish.ingredient;
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

    // const updatedIngredients = ingredients.map((ingredient) => {
    //   return {
    //     id: ingredient.id,
    //     dish_id: ingredient.dish_id,
    //     user_id: ingredient.user_id,
    //     name: ingredient.name,
    //   };
    // });

    // console.log(updatedIngredients);

    // await knex("ingredients")
    //   .where({ dish_id })
    //   .update(updatedIngredients);

    return res.json(updatedDish);
  }
}

module.exports = DishsController;
