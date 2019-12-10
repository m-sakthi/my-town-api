module.exports.email = {
  service: process.env.NODE_ENV === 'production' ? 'SES' : 'SendGrid',
  auth: {
    // api_user: 'app51688772@heroku.com',
    // api_key: 'frxghtdu6512'

    user: 'apikey',
    pass: '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'
  },
  // testMode: true
};