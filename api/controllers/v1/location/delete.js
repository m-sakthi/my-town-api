module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Location.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Location ID',
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

    await Location.destroyOne(inputs.id);
    return exits.success();
  }

};
