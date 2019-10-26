module.exports = {


  friendlyName: 'List',


  description: 'List OutletItem.',


  inputs: {
    outletId: {
      type: 'number',
      description: 'Outlet Id',
      example: 123
    },

    itemId: {
      type: 'number',
      description: 'Item ID',
      example: 12,
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    var params = {};
    if (inputs.outletId != undefined) {
      params = Object.assign(params, { outlet: inputs.outletId });
    }

    if (inputs.itemId  != undefined) {
      params = Object.assign(params, { item: inputs.itemId });
    }

    var outletItemRecords = await OutletItem.find(params);
    return exits.success(outletItemRecords);
  }

};
