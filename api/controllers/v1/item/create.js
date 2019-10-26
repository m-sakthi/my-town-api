module.exports = {


  friendlyName: 'Create',


  description: 'Create Item.',


  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Item Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that Item',
      example: 'All Provosional items will be available',
    },

    category: {
      type: 'number',
      required: true,
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
    var newName = inputs.name.toLowerCase();

    var category = await Category.findOne(inputs.category);
    if (!category) {
      return exits.notFound({ error: 'Category not found' });
    }

    var newItemRecord = await Item.create({
      name: newName,
      overview: inputs.overview,
      category: inputs.category
    })
    .intercept('E_UNIQUE', 'nameAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    return exits.success(newItemRecord);

  }

};
