exports.up = function (knex) {
  return knex.schema.createTable('category', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('name', 120).notNull();
    t.string('overview', 255).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('category');
};