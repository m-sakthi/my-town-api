exports.up = function (knex) {
  return knex.schema.createTable('orderitem', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('quantity').notNull();
    t.integer('order').notNull().references('id').inTable('order');
    t.integer('item').notNull().references('id').inTable('item');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orderitem');
};