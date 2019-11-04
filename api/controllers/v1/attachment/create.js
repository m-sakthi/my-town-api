/**
 * Module dependencies
 */

// ...


/**
 * attachment/create.js
 *
 * Create attachment.
 */
module.exports = async function create(req, res) {
  if (!req.file('file')) return res.badRequest('Required parameter `file` no present.');

  const { s3Upload, s3UploadConfig, localDiskUploadConfig } = sails.config.custom;

  let config = localDiskUploadConfig, downloadBaseUrl = '';
  if (s3Upload) {
    config = _.omit(s3UploadConfig, ['host']);
    downloadBaseUrl = s3UploadConfig.host;
  }

  req.file('file').upload(config,
    (err, uploadedFiles) => {
      if (err) return res.serverError(err);
      if (uploadedFiles.length === 0) return res.badRequest('No file was uploaded');

      Attachment.create({
        url: require('util').format('%s%s', downloadBaseUrl, uploadedFiles[0].fd),
        fileDescription: uploadedFiles[0].fd
      })
        .exec(function (err, attachment) {
          if (err) return res.serverError(err);
          return res.ok(attachment);
        });
    });

};
