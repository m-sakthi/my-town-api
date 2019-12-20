module.exports = {

  friendlyName: 'Create',

  description: 'Create Device.',

  inputs: {
    userId: {
      type: 'number',
      required: true,
      description: 'User ID',
      example: 1
    },

    platform: {
      type: 'number',
      isIn: Object.keys(sails.config.custom.device).map(i => parseInt(i)),
      description: 'Platform OS of the device',
      example: 1,
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },

  fn: async function (inputs, exits) {
    // let record = await Device.create(inputs);
    return exits.success({});
  }

};
