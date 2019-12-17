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

    // let currentTime = new Date();
    // const offers = await Offer.find({
    //   resourceId: outletIds,
    //   resourceType: 'Outlet',
    //   startTime: { '<=': currentTime },
    //   endTime: { '>=': currentTime },
    // });

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

    // console.log('outlets::', outlets);

    return exits.success(records);
  }

};

// records = [{ id: 1, name: 'something1' }, { id: 2, name: 'anyName2' }, { id: 3, name: 'anything' }]
// offers = [{ resourceId: 1 }, { resourceId: 2 }]
// records.map(r => {
//   offer = offers.filter(o => o.resourceId === r.id)[0]
//   if (offer) r.offer = offer
//   return r;
// })
