exports.up = function (knex) {
  return knex.schema.createTable('useraddress', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('address').notNull().references('id').inTable('address');
    t.integer('user').notNull().references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('useraddress');
};