module.exports = {

  friendlyName: 'Create',

  description: 'Create role.',

  inputs: {

    name: {
      type: 'string',
      required: true,
      description: 'Role name',
      maxLength: 30,
      example: 'admin'
    },

  },

  exits: {

    nameAlreadyInUse: {
      statusCode: 400,
      description: 'The provided role name is already available.',
    },

  },

  fn: async function (inputs, exits) {

    let newRecord = await Role.create({
      name: inputs.name.toLowerCase(),
    })
      .intercept('E_UNIQUE', (e) => exits.nameAlreadyInUse({
        error: { message: e.message, attrNames: e.attrNames }
      }))
      .fetch();

    return exits.success(newRecord);

  }

};
