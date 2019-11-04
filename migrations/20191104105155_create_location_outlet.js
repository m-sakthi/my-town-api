exports.up = function (knex) {
  return knex.schema.createTable('locationoutlet', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('location').nullable().references('id').inTable('location');
    t.integer('outlet').nullable().references('id').inTable('outlet');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('locationoutlet');
};