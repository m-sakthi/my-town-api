exports.up = function (knex) {
  return knex.schema.table('user', function (t) {
    t.integer('emailProofToken').nullable();
    t.timestamp('emailProofTokenExpiresAt').defaultTo();
    t.integer('emailStatus').defaultsTo(1);
  })
};

exports.down = function (knex) {
  return knex.schema.table('user', function (t) {
    t.dropColumn('emailProofToken');
    t.dropColumn('emailProofTokenExpiresAt');
    t.dropColumn('emailStatus');
  })
};
