exports.up = function (knex) {
  return knex.schema.createTable('outlet', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('name', 120).notNull();
    t.string('overview', 255).notNull();
    t.enum('status', ['fresh', 'active', 'deleted']).notNull().defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('outlet');
};