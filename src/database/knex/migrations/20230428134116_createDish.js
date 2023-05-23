exports.up = (knex) =>
  knex.schema.createTable("dishs", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.text("dish_image").nullable();
    table.text("title").notNullable();
    table.text("category").notNullable();
    table.text("ingredients").notNullable();
    table.text("description").notNullable();
    table.integer("price").notNullable();
  });

exports.down = (knex) => knex.dropTable("dishs");
