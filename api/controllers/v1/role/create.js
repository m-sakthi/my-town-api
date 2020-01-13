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

    invalid: {
      responseType: 'errorHandler',
      description: 'The provided role name is already available.',
    },

  },

  fn: async function (inputs, exits) {

    let newRecord = await Role.create({
      name: inputs.name.toLowerCase(),
    })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newRecord);

  }

};
