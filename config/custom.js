/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …

  // frxghtdu6512
  // app51688772@heroku.com

  baseUrl: process.env.MY_TOWN_API_PRODUCTION_HTTPS_API_URL,
  jwt_token_secret: process.env.TOKEN_SECRET || 'Zzd814nldl91104qor5911gjald',

  s3Upload: false,

  s3UploadConfig: {
    adapter: require('skipper-s3'),
    key: 'poiuytrewqasdfghjkl',
    secret: 'poiuytresdfghjk,mnbvcxzaqwertyuiop',
    bucket: 'some-bucketname',
    host: 'https://somehost.net/'
  },

  localDiskUploadConfig: {
    maxBytes: 10000000,
  },

  verifyEmailAddresses: true,
  emailProofTokenValidity: 86000,

};
