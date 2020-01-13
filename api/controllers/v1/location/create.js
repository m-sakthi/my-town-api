module.exports = {


  friendlyName: 'Create',


  description: 'Create Location.',


  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Location Name',
      maxLength: 120,
      example: 'Chennai'
    },
  },


  exits: {
    invalid: {
      responseType: 'errorHandler',
    },
  },


  fn: async function (inputs, exits) {
    var newRecord = await Location.create({
      name: inputs.name.toLowerCase(),
    })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newRecord);
  }


};
