module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Category.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Category ID',
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

    await Category.destroyOne(inputs.id);
    return exits.success();
  }

};
