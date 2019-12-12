module.exports = {

  friendlyName: 'Index',

  description: 'Index user role.',

  inputs: {

    roleId: {
      type: 'number',
      description: 'Role ID',
      example: 1
    },

    userId: {
      type: 'number',
      description: 'User Id',
      example: 1
    }

  },

  exits: {

  },

  fn: async function (inputs, exits) {

    let criteria = {};

    if (inputs.roleId)
      criteria = { ...criteria, role: inputs.roleId };

    if (inputs.userId)
      criteria = { ...criteria, user: inputs.userId }

    var userRoles = await UserRole.find(criteria)
      .populate('role');

    return exits.success(userRoles);
  }

};
