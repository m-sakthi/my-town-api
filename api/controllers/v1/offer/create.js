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
    },

    startTime: {
      type: 'string',
      required: true,
      description: 'Offer Start Time in epoch timestamp'
    },

    endTime: {
      type: 'string',
      required: true,
      description: 'Offer End Time in epoch timestamp'
    },

    resourceType: {
      type: 'string',
      description: 'To which resource the offer is tagged to.',
      example: 'Outlet',
    },

    resourceId: {
      type: 'number',
      description: 'To which resource ID the offer is tagged to.',
      example: 100,
    },
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
      startTime: new Date(parseInt(inputs.startTime)),
      endTime: new Date(parseInt(inputs.endTime)),
      resourceType: inputs.resourceType,
      resourceId: inputs.resourceId
    })
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newRecord);

  }

};
