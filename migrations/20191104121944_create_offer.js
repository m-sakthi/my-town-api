exports.up = function (knex) {
  return knex.schema.createTable('offer', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('name').notNull();
    t.text('overview').nullable();
    t.decimal('percentage', 3, 2).notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('offer');
};