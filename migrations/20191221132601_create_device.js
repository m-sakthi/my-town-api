exports.up = function (knex) {
  return knex.schema.createTable('device', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('token').notNull();
    t.integer('platform').notNull();
    t.integer('user').notNull().references('id').inTable('user');

    t.unique(['token', 'user']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('device');
};