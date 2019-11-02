exports.up = function (knex) {
  return knex.schema.createTable('location', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('name').notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('location');
};