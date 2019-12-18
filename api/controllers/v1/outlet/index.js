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
    const { knex } = sails.config;
    if (inputs.locationId)
      outletIds = await knex('locationoutlet')
        .where({ location: inputs.locationId }).pluck('outlet');

    let records = await Outlet.find(outletIds);

    let currentTime = new Date();
    const offers = await Offer.find({
      resourceId: outletIds,
      resourceType: 'Outlet',
      startTime: { '<=': currentTime },
      endTime: { '>=': currentTime },
    }).sort('sequence');

    records = records.map(r => {
      outletOffers = offers.filter(o => parseInt(o.resourceId) === parseInt(r.id))
      if (offers.length) r.offers = outletOffers;
      return r;
    });

    // let outlets = await knex
    //   .select('outlet.id', 'outlet.name', 'outlet.overview', 'outlet.status',
    //     'offer.percentage', 'offer.startTime', 'offer.endTime')
    //   .from('outlet')
    //   .whereIn('outlet.id', outletIds)
    //   .leftJoin('offer', function () {
    //     this.on('outlet.id', '=', 'offer.resourceId')
    //       .andOn('offer.startTime', '<=', knex.fn.now())
    //       .andOn('offer.endTime', '>=', knex.fn.now())
    //       .andOn('offer.resourceType', '=', knex.raw('?', 'Outlet'))
    //   });

    return exits.success(records);
  }

};