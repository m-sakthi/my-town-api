module.exports = {

  friendlyName: 'Update',

  description: 'Update Outlet.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Outlet ID',
    },

    name: {
      type: 'string',
      description: 'Full representation of the Outlet Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      description: 'Some overview about that Outlet',
      example: 'All Provosional items will be available',
    },

    status: {
      type: 'string',
      isIn: ['active', 'deleted'],
      defaultsTo: 'active',
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
    let outlet = await Outlet.findOne(inputs.id);
    if (!outlet) {
      return exits.notFound({ error: 'Outlet not found' });
    }

    let payload = {};
    if (inputs.name != undefined) {
      let newName = inputs.name.toLowerCase();
      payload = Object.assign(payload, { name: newName });
    }

    if (inputs.overview != undefined) {
      payload = Object.assign(payload, { overview: inputs.overview });
    }

    if (inputs.status != undefined) {
      payload = Object.assign(payload, { status: inputs.status });
    }

    let updatedRecord = await Outlet.updateOne(inputs.id)
      .set(payload)
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid');

    if (inputs.attachmentIds) {
      const values = inputs.attachmentIds.split(",").map(i => ({
        outlet: inputs.id,
        attachment: parseInt(i.trim()),
      }));
      await sails.config.knex.insert(values).into('outlet_attachment');
    }

    return exits.success(updatedRecord);

  }

};
