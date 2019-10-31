module.exports = {

  friendlyName: 'Update',

  description: 'Update Offer',


  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Offer ID',
    },

    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Offer Name',
      maxLength: 120,
      example: 'Freedom Offer'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that offer',
      example: 'All Provisonanl items are available at 50% discount',
    },

    percentage: {
      type: 'number',
      required: true,
      description: '% off from original price',
      example: 10
    },

  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },


  fn: async function (inputs, exits) {
    let offer = await Offer.findOne(inputs.id);
    if (!offer) {
      return exits.notFound({ error: 'Offer not found' });
    }

    let payload = {};
    if (inputs.name != undefined)
      payload = Object.assign(payload, { name: inputs.name });

    if (inputs.overview != undefined)
      payload = Object.assign(payload, { overview: inputs.overview });

    if (inputs.percentage != undefined)
      payload = Object.assign(payload, { percentage: inputs.percentage });

    let updatedRecord = await Offer.updateOne(inputs.id)
      .set(payload)
      .intercept({ name: 'UsageError' }, 'invalid');

    return exits.success(updatedRecord);

  }


};

