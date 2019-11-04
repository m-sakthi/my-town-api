/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // CUSTOM POLICIES

  '*': true,

  // All the APIs should be Authenticated
  // 'v1/*': ['isAuthenticated'],

  'v1/user/create': true,
  'v1/user/index': true,
  'swagger': true,

};
