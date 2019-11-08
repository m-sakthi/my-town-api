exports.up = function(knex) {
  return knex.schema.table('item', function (t) {
    t.integer('category').notNull().references('id').inTable('category');
  })
};

exports.down = function(knex) {
  return knex.schema.table('item', function (t) {
    t.dropColumn('category');
  })
};