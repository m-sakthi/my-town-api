exports.up = function (knex) {
  return knex.schema.createTable('user', function (t) {
    t.increments('id').unsigned().primary();
    t.bigInteger('createdAt').defaultTo(+new Date());
    t.bigInteger('updatedAt').defaultTo(+new Date());

    t.string('emailAddress', 120).nullable();
    t.string('password', 36).nullable();
    t.string('firstName', 120).nullable();
    t.string('lastName', 120).nullable();
    t.string('mobileNo', 15).nullable();
    t.string('gender', 12).nullable();
    t.integer('location').nullable().references('id').inTable('location');

    t.unique('mobileNo');
    t.unique('emailAddress');
    t.unique(['mobileNo', 'emailAddress']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};