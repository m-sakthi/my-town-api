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

    let records = await Outlet.find(outletIds);

    let currentTime = +new Date();
    const offers = await Offer.find({
      resourceId: outletIds,
      resourceType: 'Outlet',
      startTime: { '>=': currentTime },
      // endTime: { '<=': currentTime },
    });
    console.log("******* ", records, offers)
    return exits.success(records);
  }

};
