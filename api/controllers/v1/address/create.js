module.exports = {

  friendlyName: 'Create',

  description: 'Create Address.',

  inputs: {
    isPrimary: {
      type: 'boolean',
      description: 'true/false. Whether this location is primary for user',
      example: true,
    },

    doorNo: {
      type: 'string',
      description: 'Door/Flat/Building number',
      example: '7G'
    },

    line1: {
      type: 'string',
      description: 'Street/Locality name',
      example: 'Rainbow Colony'
    },

    line2: {
      type: 'string',
      description: 'Area/Villege/Town/District name',
      example: 'Kotturpuram, Chennai'
    },

    state: {
      type: 'string',
      description: 'State',
      example: 'Tamilnadu'
    },

    landmark: {
      type: 'string',
      description: 'Landmark',
      example: 'ABC Apartment'
    },

    pincode: {
      type: 'string',
      description: 'Pincode for your address',
      example: '600001'
    },

    latitude: {
      type: 'string',
      description: 'latitude details',
      example: '15.887376'
    },

    longitude: {
      type: 'string',
      description: 'longitude details',
      example: '15.887376'
    },

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    let newRecord = await Address.create(inputs)
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newRecord);

  }

};