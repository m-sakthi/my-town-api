exports.up = function (knex) {
  return knex.schema.createTable('outletaddress', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('address').nullable().references('id').inTable('address');
    t.integer('outlet').nullable().references('id').inTable('outlet');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('outletaddress');
};