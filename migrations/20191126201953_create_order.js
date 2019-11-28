exports.up = function (knex) {
  return knex.schema.createTable('order', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.decimal('totalPrice', 10, 2).notNull();
    t.string('status', 20).notNull();
    t.string('notes');
    t.integer('address').notNull().references('id').inTable('address');
    t.integer('user').notNull().references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order');
};