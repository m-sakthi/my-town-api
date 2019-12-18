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
      description: 'Full representation of the Offer Name',
      maxLength: 120,
      example: 'Freedom Offer'
    },

    overview: {
      type: 'string',
      description: 'Some overview about that offer',
      example: 'All Provisonanl items are available at 50% discount',
    },

    percentage: {
      type: 'number',
      description: '% off from original price',
      example: 10
    },

    startTime: {
      type: 'string',
      description: 'Offer Start Time in epoch timestamp'
    },

    endTime: {
      type: 'string',
      description: 'Offer End Time in epoch timestamp'
    },

    sequence: {
      type: 'number',
      description: 'Which sequence it should appear',
      example: 1,
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
    let offer = await Offer.findOne(inputs.id);
    if (!offer) return exits.notFound({ error: 'Offer not found' });

    let payload = {};
    if (inputs.name)
      payload = { ...payload, name: inputs.name };

    if (inputs.overview)
      payload = { ...payload, overview: inputs.overview };

    if (inputs.percentage)
      payload = { ...payload, percentage: inputs.percentage };

    if (inputs.resourceType)
      payload = { ...payload, resourceType: inputs.resourceType };

    if (inputs.resourceId)
      payload = { ...payload, resourceId: parseInt(inputs.resourceId) };

    if (inputs.sequence)
      payload = { ...payload, sequence: parseInt(inputs.sequence) };

    if (inputs.startTime)
      payload = { ...payload, startTime: new Date(parseInt(inputs.startTime)) };

    if (inputs.endTime)
      payload = { ...payload, endTime: new Date(parseInt(inputs.endTime)) };

    let updatedRecord = await Offer.updateOne(inputs.id)
      .set(payload)
      .intercept({ name: 'UsageError' }, 'invalid');

    return exits.success(updatedRecord);

  }


};

