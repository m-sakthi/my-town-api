module.exports = {


  friendlyName: 'List',


  description: 'List OutletCategory',


  inputs: {
    outletId: {
      type: 'number',
      description: 'Outlet Id',
      example: 123
    },

    categoryId: {
      type: 'number',
      description: 'Category ID',
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

    if (inputs.categoryId  != undefined) {
      params = Object.assign(params, { category: inputs.categoryId });
    }

    var outletCategoryRecords = await OutletCategory.find(params);
    return exits.success(outletCategoryRecords);
  }

};
