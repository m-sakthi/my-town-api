exports.up = function (knex) {
  return knex.schema.table('attachment', function (t) {
    t.integer('nature').defaultsTo(1);
  })
};

exports.down = function (knex) {
  return knex.schema.table('attachment', function (t) {
    t.dropColumn('nature');
  })
};
