exports.up = function (knex: any) {
  return knex.schema.createTable('hobbies', function (table: any) {
    table.increments('id');
    table.integer('userId').unsigned().notNullable();
    table.string('name', 50).notNullable();
    table.string('description');

    table.foreign('userId').references('id').inTable('users');
  });
};

exports.down = function (knex: any) {
  return knex.schema.dropTable('hobbies');
};
