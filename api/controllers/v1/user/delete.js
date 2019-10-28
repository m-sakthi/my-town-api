module.exports = {

  friendlyName: 'Delete',

  description: 'Delete User.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'User ID',
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

  },

  fn: async function (inputs, exits) {
    if (this.req.currentUser.role !== "admin")
      return exits.insufficientPrivilege();

    await User.destroyOne(inputs.id);
    return exits.success();
  }

};
