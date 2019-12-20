module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Device.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Device Id',
      example: 123
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

  },

  fn: async function (inputs, exits) {
    const device = Device.findOne(inputs.id);
    if (!device)
      return exits.notFound({ error: 'Device not found.' })

    await Device.destroyOne(inputs.id);
    return exits.success();
  }

};
