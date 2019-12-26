exports.up = function (knex) {
  return knex.schema.table('locationoutlet', function (t) {
    t.integer('status').defaultsTo(1);
  })
};

exports.down = function (knex) {
  return knex.schema.table('locationoutlet', function (t) {
    t.dropColumn('status');
  })
};
