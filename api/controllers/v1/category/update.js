module.exports = {

  friendlyName: 'Update',

  description: 'Update category.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Category ID',
    },

    name: {
      type: 'string',
      description: 'Full representation of the Category Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      description: 'Some overview about that category',
      example: 'All Provosional items will be available',
    },

    nature: {
      type: 'number',
      defaultsTo: 1,
      isIn: [1, 2], // 1 -> primary, 2 -> secondary
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

    notFound: {
      responseType: 'notFound',
    },

  },

  fn: async function (inputs, exits) {
    let category = await Category.findOne(inputs.id);
    if (!category) return exits.notFound({ error: 'Category not found.' });

    let payload = {};
    if (inputs.name)
      payload = Object.assign(payload, { name: inputs.name });

    if (inputs.overview)
      payload = Object.assign(payload, { overview: inputs.overview });
    
    if(inputs.nature)
      payload = Object.assign(payload, { nature: inputs.nature })

    if (inputs.attachmentId) {
      if (!await Attachment.findOne(inputs.attachmentId))
        return exits.notFound({ error: 'Attachement not found.' });

      payload = Object.assign(payload, { attachment: inputs.attachmentId })
    }

    let updatedRecord = await Category.updateOne(inputs.id)
      .set(payload)
      .intercept(err => { exits.invalid(err) });

    return exits.success(updatedRecord);

  }

};
