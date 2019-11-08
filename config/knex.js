/**
 * Initializing knex for queriying with ease.
 * (sails.config.knex)
 *
 * For more information on how to build query with knex, check out:
 * http://knexjs.org/
 * 
 * Also got a cheatsheet for at https://devhints.io/knex
 */

module.exports.knex = require('knex')({
  client: 'postgresql',
  connection: 'postgresql://postgres:postgres@localhost:5432/my_town_new',
});