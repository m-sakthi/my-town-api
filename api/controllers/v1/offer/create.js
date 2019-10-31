module.exports = {

  friendlyName: 'Create',

  description: 'Create Offer',

  inputs: {
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
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    let newRecord = await Offer.create({
      name: inputs.name,
      overview: inputs.overview,
      percentage: inputs.percentage,
    })
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newRecord);

  }

};
