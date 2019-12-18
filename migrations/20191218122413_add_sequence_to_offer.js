exports.up = function (knex) {
  return knex.schema.table('offer', function (t) {
    t.integer('sequence');
  })
};

exports.down = function (knex) {
  return knex.schema.table('offer', function (t) {
    t.dropColumn('sequence');
  })
};
