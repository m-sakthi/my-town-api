module.exports = {

  friendlyName: 'Delete',

  description: 'Delete user role.',

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

  },

  fn: async function (inputs, exits) {

    await UserRole.destroy({
      user: inputs.userId,
      role: inputs.roleId
    })

    return exits.success();

  }

};
