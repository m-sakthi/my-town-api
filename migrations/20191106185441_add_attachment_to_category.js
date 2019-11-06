
exports.up = function(knex) {
  return knex.schema.table('category', function (t) {
    t.integer('attachment').nullable().references('id').inTable('attachment');
  })
};

exports.down = function(knex) {
  return knex.schema.table('category', function (t) {
    t.dropColumn('attachment');
  })
};
