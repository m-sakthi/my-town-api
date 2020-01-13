module.exports = {

  friendlyName: 'Create',

  description: 'Create Device.',

  inputs: {
    token: {
      type: 'string',
      required: true,
      description: 'A unique Device registration token',
      example: "opiuytdfszxcvbnmmnbvdsfghjk"
    },

    platform: {
      type: 'number',
      required: true,
      isIn: Object.keys(sails.config.custom.device).map(i => parseInt(i)),
      description: 'Platform OS of the device',
      example: 1,
    },
  },

  exits: {
    invalid: {
      responseType: 'errorHandler',
    },

  },

  fn: async function (inputs, exits) {
    let record = await Device.create({
      ...inputs,
      user: this.req.currentUser.id
    }).intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(record);
  }

};
