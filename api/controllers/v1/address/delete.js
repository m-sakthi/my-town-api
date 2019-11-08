module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Address.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Address ID',
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },
    
    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },

  fn: async function (inputs, exits) {
    let address = await Address.findOne(inputs.id);
    if (!address) return exits.notFound({ error: 'Address not found' });

    console.log()
    
    if (address.user !== this.req.currentUser.id)
      return exits.insufficientPrivilege();

    await Address.destroyOne(inputs.id).meta({ cascade: true });;
    return exits.success();
  }

};
