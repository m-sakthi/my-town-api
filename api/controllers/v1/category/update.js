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
    let category = await Category.findOne(inputs.id);
    if (!category) {
      return exits.notFound({ error: 'Category not found' });
    }

    let payload = {};
    if (inputs.name != undefined)
      payload = Object.assign(payload, { name: inputs.name.toLowerCase() });

    if (inputs.overview != undefined)
      payload = Object.assign(payload, { overview: inputs.overview });

    let updatedRecord = await Category.updateOne(inputs.id)
      .set(payload)
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid');

    return exits.success(updatedRecord);

  }


};

