exports.up = function (knex) {
  return knex.schema.table('address', function (t) {
    t.string('parentType', 30);
    t.integer('parentId');
  })
};

exports.down = function (knex) {
  return knex.schema.table('address', function (t) {
    t.dropColumn('parentType');
    t.dropColumn('parentId');
  })
};