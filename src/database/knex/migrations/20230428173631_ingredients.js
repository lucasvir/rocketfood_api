exports.up = (knex) =>
  knex.schema.createTable("ingredients", (table) => {
    table.increments("id");
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishs")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("name");
  });

exports.down = (knex) => knex.dropTable("ingredients");
