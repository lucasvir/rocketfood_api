exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.text('name').notNullable;
    table.text('email').notNullable;
    table.text('password').notNullable;
    table.boolean('is_admin').defaultTo(false);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.dropTable('users');
