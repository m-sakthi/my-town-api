exports.up = function (knex) {
  return knex.schema.createTable('address', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.boolean('isPrimary').notNull().defaultTo(false);
    t.string('doorNo').notNull();
    t.text('line1').notNull();
    t.text('line2').nullable();
    t.string('state').notNull();
    t.string('landmark').nullable();
    t.string('pincode', 20).notNull();
    t.string('longitude', 12).nullable();
    t.string('latitude', 12, 8).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('address');
};