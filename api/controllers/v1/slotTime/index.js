module.exports = {


  friendlyName: 'List',


  description: 'List SlotTime.',


  inputs: {
    slotId: {
      type: 'number',
      description: 'Slot Id',
      example: 123
    },
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    var params = {};
    if (inputs.slotId)
      params = Object.assign(params, { slot: inputs.slotId });

    var records = await SlotTime.find(params);
    return exits.success(records);
  }

};
