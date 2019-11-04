exports.up = function (knex) {
  return knex.schema.createTable('outletitem', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('overview', 255).nullable();
    t.decimal('price', 10, 2).nullable();

    t.integer('item').notNull().references('id').inTable('item');
    t.integer('outlet').notNull().references('id').inTable('outlet');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('outletitem');
};