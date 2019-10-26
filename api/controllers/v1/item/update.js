module.exports = {


  friendlyName: 'Update',


  description: 'Update category.',


  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Item ID',
    },

    name: {
      type: 'string',
      description: 'Full representation of the Item Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      description: 'Some overview about that Item',
      example: 'All Provosional items will be available',
    },

    category: {
      type: 'number',
      description: 'Category to which the items is tagged to',
      example: 12,
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
      statusCode: 404,
      description: 'Not found',
    },

  },


  fn: async function (inputs, exits) {
    var item = await Item.findOne(inputs.id);
    if (!item) {
      return exits.notFound({ error: 'Item not found' });
    }

    var payload = {};
    if (inputs.name != undefined) {
      var newName = inputs.name.toLowerCase();
      payload = Object.assign(payload, { name: newName });
    }

    if (inputs.overview != undefined) {
      payload = Object.assign(payload, { overview: inputs.overview });
    }

    if (inputs.category != undefined) {
      var category = await Category.findOne(inputs.category);
      if (!category) {
        return exits.notFound({ error: 'Category not found' });
      }
      payload = Object.assign(payload, { category: inputs.category });
    }

    var updatedRecord = await Item.update({ id: inputs.id })
    .set(payload)
    .intercept('E_UNIQUE', 'nameAlreadyInUse')
    .intercept({ name: 'UsageError' }, 'invalid')
    .fetch();

    return exits.success(updatedRecord);

  }


};
