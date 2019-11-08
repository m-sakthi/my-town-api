exports.up = function(knex) {
  return knex.schema.table('item', function (t) {
    t.unique('name');
  })
};

exports.down = function(knex) {
  return knex.schema.table('item', function (t) {
    t.dropIndex('name');
  })
};
