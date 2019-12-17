exports.up = function (knex) {
  return knex.schema.table('offer', function (t) {
    t.string('resourceType', 60).nullable();
    t.bigInteger('resourceId').nullable();
    t.timestamp('startTime');
    t.timestamp('endTime');
  })
};

exports.down = function (knex) {
  return knex.schema.table('offer', function (t) {
    t.dropColumn('resourceType');
    t.dropColumn('resourceId');
    t.dropColumn('startTime');
    t.dropColumn('endTime');
  })
};
