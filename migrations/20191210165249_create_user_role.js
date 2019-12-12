exports.up = function (knex) {
  return knex.schema.createTable('user_role', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.bigInteger('resourceId');
    t.string('resourceType', 30);
    t.integer('role').notNull().references('id').inTable('role');
    t.integer('user').notNull().references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_role');
};