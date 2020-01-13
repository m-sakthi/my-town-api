module.exports = {

  friendlyName: 'Create',

  description: 'Create user role.',

  inputs: {

    roleId: {
      type: 'number',
      required: true,
      description: 'Role ID',
      example: 1
    },

    userId: {
      type: 'number',
      required: true,
      description: 'User Id',
      example: 1
    }

  },

  exits: {

    invalid: {
      description: 'The provided user and role combination already exists.',
      responseType: 'errorHandler'
    },

    notFound: {
      description: 'Not found error',
      statusCode: 404,
    }

  },

  fn: async function (inputs, exits) {

    let user = await User.findOne(inputs.userId)
    if (!user) return exits.notFound({ error: 'User not found.' });

    let role = await Role.findOne(inputs.roleId)
    if (!role) return exits.notFound({ error: 'Role not found.' });

    try {

      let newRecord = await UserRole.create({
        user: inputs.userId,
        role: inputs.roleId
      })
        .intercept(err => { exits.invalid(err) })
        .fetch();

      return exits.success(newRecord);

    } catch (e) {

      return exits.combinationAlreadyEists({ error: e.message });

    }

  }

};