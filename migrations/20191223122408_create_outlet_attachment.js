exports.up = function (knex) {
  return knex.schema.createTable('outlet_attachment', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.integer('outlet').notNull().references('id').inTable('outlet');
    t.integer('attachment').notNull().references('id').inTable('attachment');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('outlet_attachment');
};