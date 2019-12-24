/**
 * Initializing AWS for easy access to AWS services.
 * (sails.config.AWS)
 */
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'asdfdsafsadfasdfasdf',
  secretAccessKey: 'safasdfasfasfsadfs',
  region: 'ap-south-1',
});

module.exports.AWS = {
  s3: new AWS.S3({ bucketName: 'attachments' }),
  // Make sure this region supports SMS https://docs.aws.amazon.com/sns/latest/dg/sns-supported-regions-countries.html
  sns: new AWS.SNS({ region: "ap-southeast-1" }),
};