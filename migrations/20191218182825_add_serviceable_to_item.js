exports.up = function (knex) {
  return knex.schema.table('item', function (t) {
    t.boolean('serviceable').defaultsTo(false);
    t.boolean('deliverable').defaultsTo(false);
  })
};

exports.down = function (knex) {
  return knex.schema.table('item', function (t) {
    t.dropColumn('serviceable');
    t.dropColumn('deliverable');
  })
};
