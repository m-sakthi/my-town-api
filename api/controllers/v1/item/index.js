module.exports = {


  friendlyName: 'List',


  description: 'List Item.',


  inputs: {
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
    if (inputs.categoryId  != undefined) {
      params = Object.assign(params, { category: inputs.categoryId });
    }

    var itemRecords = await Item.find(params);
    return exits.success(itemRecords);
  }

};
