module.exports = {

  friendlyName: 'List',

  description: 'List Outlets.',

  inputs: {
    locationId: {
      type: 'number',
      required: true,
      description: 'Location ID',
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    const { knex } = sails.config;

    let records = await knex
      .select('outlet.*', 'locationoutlet.status as outletStatus', 'locationoutlet.id as locationOutletId')
      .from('outlet')
      .join('locationoutlet', function () {
        this.on('outlet.id', '=', 'locationoutlet.outlet')
          .andOn('locationoutlet.location', '=', inputs.locationId)
      })

    const attachments = await knex('attachment')
      .where('attachment.nature', 2)
      .join('outlet_attachment', function () {
        this.on('attachment.id', '=', 'outlet_attachment.attachment')
          .onIn('outlet_attachment.outlet', records.map(o => o.id))
      })

    records = records.map(r => {
      r.attachment = attachments.filter(a => parseInt(a.outlet) === parseInt(r.id))[0]
      return r;
    });

    const addresses = await Address.find({
      parentType: 'locationoutlet',
      parentId: records.map(i => i.locationOutletId)
    })

    records = records.map(r => {
      r.address = addresses.filter(address => parseInt(address.parentId) === parseInt(r.id))[0]
      return r;
    });

    let currentTime = new Date();
    const offers = await Offer.find({
      resourceId: records.map(i => i.id),
      resourceType: 'Outlet',
      startTime: { '<=': currentTime },
      endTime: { '>=': currentTime },
    }).sort('sequence');

    records = records.map(r => {
      outletOffers = offers.filter(o => parseInt(o.resourceId) === parseInt(r.id))
      r.offers = outletOffers;
      return r;
    });

    return exits.success(records);
  }

};

// let outlets = await knex
//   .select('outlet.id', 'outlet.name', 'outlet.overview', 'outlet.status',
//     'offer.percentage', 'offer.startTime', 'offer.endTime')
//   .from('outlet')
//   .whereIn('outlet.id', records.map(i => i.id))
//   .leftJoin('offer', function () {
//     this.on('outlet.id', '=', 'offer.resourceId')
//       .andOn('offer.startTime', '<=', knex.fn.now())
//       .andOn('offer.endTime', '>=', knex.fn.now())
//       .andOn('offer.resourceType', '=', knex.raw('?', 'Outlet'))
//   });