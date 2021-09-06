exports.up = function (knex: any) {
  return knex.schema.createTable('users', function (table: any) {
    table.increments('id');
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
  });
};

exports.down = function (knex: any) {
  return knex.schema.dropTable('users');
};
