exports.up = function (knex) {
  return knex.schema.table('user', function (t) {
    t.integer('mobileVerificationToken');
    t.integer('mobileVerificationStatus').defaultsTo(1);
  })
};

exports.down = function (knex) {
  return knex.schema.table('user', function (t) {
    t.dropColumn('mobileVerificationToken');
    t.dropColumn('mobileVerificationStatus');
  })
};
