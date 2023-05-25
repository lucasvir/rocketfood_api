// const knex = require("../database/knex");

// class IngredientsController {
//   async index(req, res) {
//     const user_id = req.user.id;

//     const ingredients = await knex("ingredients").where({ user_id });
//     // .groupBy("title");

//     return res.json(ingredients);
//   }

//   async update(req, res) {
//     const { ingredients } = req.body;
//     const { dish_id } = req.params;
//     const user_id = req.user.id;

//     const newIngredients = ingredients.map((ingredient) => {
//       return {
//         dish_id,
//         user_id,
//         name: ingredient.name,
//       };
//     });

//     const updatedIngredients = await knex("ingredients")
//       .where({ dish_id })
//       .update(newIngredients);

//     res.json(updatedIngredients);
//   }
// }

// module.exports = IngredientsController;
