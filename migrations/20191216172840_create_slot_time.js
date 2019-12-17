exports.up = function (knex) {
  return knex.schema.createTable('slot_time', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.decimal('startTime', 5, 2).notNull();
    t.decimal('endTime', 5, 2).notNull();
    t.integer('slot').notNull().references('id').inTable('slot');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('slot_time');
};