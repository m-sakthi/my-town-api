module.exports = {

  friendlyName: 'Create',

  description: 'Create category.',

  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Category Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that category',
      example: 'All Provosional items will be available',
    },

    attachmentId: {
      type: 'number',
      description: 'Attachment ID',
      example: 1,
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    nameAlreadyInUse: {
      statusCode: 400,
      description: 'The provided name is already in use.',
    },

  },

  fn: async function (inputs, exits) {
    if (inputs.attachmentId && !await Attachment.findOne(inputs.attachmentId)
      ) return exits.notFound({ error: 'Attachement not found.' });

    let newCategoryRecord = await Category.create({
      name: inputs.name.toLowerCase(),
      overview: inputs.overview,
      attachment: inputs.attachmentId,
    })
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newCategoryRecord);

  }

};
