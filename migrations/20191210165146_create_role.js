exports.up = function (knex) {
  return knex.schema.createTable('role', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('name', 30).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('role');
};