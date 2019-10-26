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
    var category = await Category.findOne(inputs.id);
    if (!category) {
      return exits.notFound({ error: 'Category not found' });
    }

    var payload = {};
    if (inputs.name != undefined) {
      var newName = inputs.name.toLowerCase();
      payload = Object.assign(payload, { name: newName });
    }

    if (inputs.overview != undefined) {
      payload = Object.assign(payload, { overview: inputs.overview });
    }

    var updatedRecord = await Category.update({ id: inputs.id })
    .set(payload)
    .intercept('E_UNIQUE', 'nameAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(updatedRecord);

  }


};

