module.exports = {

  friendlyName: 'Update',

  description: 'Update role.',

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

  fn: async function (inputs) {

    var role = await Role.findOne({ id: inputs.id });
    if (!role)
      return exits.notFound({ error: 'Role not found' });

    var updatedRole = await Role.updateOne({ id: inputs.id })
      .set({ name: inputs.name })
      .intercept('E_UNIQUE', err => err)
      .intercept('E_MISSING_OR_INVALID_PARAMS', () =>
        exits.invalid({
          message: 'invalid request'
        })
      );

    return exits.success(updatedRole);

  }

};
