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
    let newCategoryRecord = await Category.create({
      name: inputs.name.toLowerCase(),
      overview: inputs.overview,
    })
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newCategoryRecord);

  }

};
