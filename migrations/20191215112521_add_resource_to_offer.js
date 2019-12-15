exports.up = function (knex) {
  return knex.schema.table('offer', function (t) {
    t.string('resourceType', 60).nullable();
    t.bigInteger('resourceId').nullable();
    t.bigInteger('startTime');
    t.bigInteger('endTime');
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
