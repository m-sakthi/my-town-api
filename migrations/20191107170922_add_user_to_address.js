exports.up = function(knex) {
  return knex.schema.table('address', function (t) {
    t.integer('user').nullable().references('id').inTable('user');
  })
};

exports.down = function(knex) {
  return knex.schema.table('address', function (t) {
    t.dropColumn('user');
  })
};
