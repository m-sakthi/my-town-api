exports.up = function (knex) {
  return knex.schema.table('user', function (t) {
    t.string('emailProofToken', 255).nullable();
    t.timestamp('emailProofTokenExpiresAt').defaultTo(new Date(+new Date() + 86000));
    t.string('emailStatus', 20).nullable();
  })
};

exports.down = function (knex) {
  return knex.schema.table('user', function (t) {
    t.dropColumn('emailProofToken');
    t.dropColumn('emailProofTokenExpiresAt');
    t.dropColumn('emailStatus');
  })
};
