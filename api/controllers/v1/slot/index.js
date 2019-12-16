module.exports = {


  friendlyName: 'List',


  description: 'List Slots.',


  inputs: {
    outletId: {
      type: 'number',
      description: 'Outlet Id',
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
    if (inputs.outletId)
      params = Object.assign(params, { outlet: inputs.outletId });

    var records = await Slot.find(params);
    return exits.success(records);
  }

};
