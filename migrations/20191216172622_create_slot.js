exports.up = function (knex) {
  return knex.schema.createTable('slot', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('day', 10).notNull();
    t.string('status', 10).notNull();
    t.integer('outlet').notNull().references('id').inTable('outlet');

    t.unique(['day', 'outlet']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('slot');
};