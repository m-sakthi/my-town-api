module.exports = {

  friendlyName: 'Create',

  description: 'Create Outlet.',

  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Outlet Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that Outlet',
      example: 'All Provosional items will be available',
    },

    attachmentIds: {
      type: 'string',
      description: 'Comma seperated Attachement IDs'
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
    var newRecord = await Outlet.create({
      name: inputs.name,
      overview: inputs.overview,
      status: 'active',
    })
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    if (inputs.attachmentIds) {
      const values = inputs.attachmentIds.split(",").map(i => ({
        outlet: newRecord.id,
        attachment: parseInt(i.trim()),
      }));
      await sails.config.knex.insert(values).into('outlet_attachment');
    }

    return exits.success(newRecord);
  }

};
