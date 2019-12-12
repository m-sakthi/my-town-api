module.exports = {

  friendlyName: 'Delete',

  description: 'Delete role.',

  inputs: {

  },

  exits: {

  },

  fn: async function (inputs) {

    await Role.destroyOne(inputs.id);
    return exits.success();

  }

};
