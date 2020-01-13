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
  if (!req.file('file')) return res.badRequest({ error: 'Required parameter `file` not present.' });

  const { s3Upload, s3UploadConfig, localDiskUploadConfig } = sails.config.custom;

  let config = localDiskUploadConfig, downloadBaseUrl = '';
  if (s3Upload) {
    config = _.omit(s3UploadConfig, ['host']);
    downloadBaseUrl = s3UploadConfig.host;
  }

  req.file('file').upload(config,
    async (err, uploadedFiles) => {
      if (err) return res.serverError(err);
      if (uploadedFiles.length === 0) return res.badRequest({ error: 'No file was uploaded' });

      try {
        let attachment = await Attachment.create({
          url: require('util').format('%s%s', downloadBaseUrl, uploadedFiles[0].fd),
          fileDescription: uploadedFiles[0].fd,
          creator: req.currentUser.id
        }).fetch()
        return res.json(attachment);
      } catch (e) {
        return res.badRequest(e);
      }
    });
};


// let data = {
  //   Bucket: 'jellyfishBucket',
  //   Key: 'image1',
  //   Body: req.file('file')._files[0].stream._readableState.buffer,
  //   ACL: 'public-read',
  //   ContentEncoding: 'base64',
  //   ContentType: 'image/png'
  // };

  // sails.config.AWS.s3.upload(data, function (err, response) {
  //   if (err) {
  //     console.log('Error uploading Image!', err);
  //     return res.json({error: err})
  //   } else {
  //     console.log('Image upload successfully!', response);
  //     return res.json({message: 'Image upload successfully!'})
  //   }
  // } )