module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Slot.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Slot ID',
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

  },

  fn: async function (inputs, exits) {
    await Slot.destroyOne(inputs.id);
    return exits.success();
  }

};
