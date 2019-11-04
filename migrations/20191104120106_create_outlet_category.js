exports.up = function (knex) {
  return knex.schema.createTable('outletcategory', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('category').notNull().references('id').inTable('category');
    t.integer('outlet').notNull().references('id').inTable('outlet');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('outletcategory');
};