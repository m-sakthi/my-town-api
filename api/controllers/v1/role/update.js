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

    invalid: {
      responseType: 'errorHandler',
      description: 'The provided role name is already available.',
    },

    notFound: {
      responseType: 'notFound',
    },

  },

  fn: async function (inputs) {

    var role = await Role.findOne({ id: inputs.id });
    if (!role)
      return exits.notFound({ error: 'Role not found' });

    var updatedRole = await Role.updateOne({ id: inputs.id })
      .set({ name: inputs.name })
      .intercept(err => { exits.invalid(err) });

    return exits.success(updatedRole);

  }

};
