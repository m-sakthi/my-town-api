module.exports = {

  friendlyName: 'Create',

  description: 'Create category.',

  inputs: {
    name: {
      type: 'string',
      required: true,
      unique: true,
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
      responseType: 'errorHandler',
    },

    notFound: {
      responseType: 'notFound',
    },

  },

  fn: async function (inputs, exits) {
    if (inputs.attachmentId && !await Attachment.findOne(inputs.attachmentId)
      ) return exits.notFound({ error: 'Attachement not found.' });

    let newCategoryRecord = await Category.create({
      name: inputs.name,
      overview: inputs.overview,
      attachment: inputs.attachmentId,
      nature: inputs.nature,
    })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newCategoryRecord);

  }

};
