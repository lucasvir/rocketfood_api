exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.dropTable("users");
