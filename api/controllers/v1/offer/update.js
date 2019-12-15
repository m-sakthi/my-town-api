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
      type: 'number',
      description: 'Offer Start Time',
      example: 1502844074211,
    },

    endTime: {
      type: 'number',
      description: 'Offer End Time',
      example: 1502844074211,
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
      payload = Object.assign(payload, { name: inputs.name });

    if (inputs.overview)
      payload = Object.assign(payload, { overview: inputs.overview });

    if (inputs.percentage)
      payload = Object.assign(payload, { percentage: inputs.percentage });

    if (inputs.resourceType)
      payload = Object.assign(payload, { resourceType: inputs.resourceType });

    if (inputs.resourceId)
      payload = Object.assign(payload, { resourceId: parseInt(inputs.resourceId) });

    if (inputs.startTime)
      payload = Object.assign(payload, { startTime: parseInt(inputs.startTime) });

    if (inputs.endTime)
      payload = Object.assign(payload, { endTime: parseInt(inputs.endTime) });

    let updatedRecord = await Offer.updateOne(inputs.id)
      .set(payload)
      .intercept({ name: 'UsageError' }, 'invalid');

    return exits.success(updatedRecord);

  }


};

