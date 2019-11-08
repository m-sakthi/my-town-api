module.exports = {


  friendlyName: 'List',


  description: 'List Outlets.',


  inputs: {
    locationId: {
      type: 'number',
      description: 'Location ID',
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    let outletIds;
    if (inputs.locationId)
      outletIds = await sails.config.knex('locationoutlet')
        .where({ location: inputs.locationId }).pluck('outlet');

    var records = await Outlet.find(outletIds);
    return exits.success(records);
  }

};
