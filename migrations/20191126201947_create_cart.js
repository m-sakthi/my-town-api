exports.up = function (knex) {
  return knex.schema.createTable('cart', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('quantity').notNull();
    t.integer('item').notNull().references('id').inTable('item');
    t.integer('user').notNull().references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cart');
};