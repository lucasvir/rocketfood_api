exports.up = (knex) =>
  knex.schema.createTable("dishs", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.text("title");
    table.text("description");
    table.integer("price");
  });

exports.down = (knex) => knex.dropTable("dishs");
