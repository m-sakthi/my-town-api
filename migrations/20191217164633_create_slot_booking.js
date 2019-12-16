exports.up = function (knex) {
  return knex.schema.createTable('slot_booking', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('status').defaultTo(0);
    t.integer('slotTime').notNull().references('id').inTable('slot_time');
    t.integer('user').notNull().references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('slot_booking');
};