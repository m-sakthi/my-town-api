module.exports = {

  friendlyName: 'Delete',

  description: 'Delete SlotTime.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'SlotTime ID',
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

  },

  fn: async function (inputs, exits) {
    await SlotTime.destroyOne(inputs.id);
    return exits.success();
  }

};
