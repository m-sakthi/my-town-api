exports.up = function(knex) {
  return knex.schema.table('location', function (t) {
    t.unique('name');
  })
};

exports.down = function(knex) {
  return knex.schema.table('location', function (t) {
    t.dropIndex('name');
  })
};
