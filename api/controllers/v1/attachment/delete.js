module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Attachemnt.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Id',
      example: 123
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

  },

  fn: async function (inputs, exits) {
    const attachment = Attachemnt.findOne({ item: inputs.itemId, user: this.req.currentUser.id });
    if (!attachment)
      return exits.notFound({ error: 'Attachment not found' })
    
    if (attachment.user !== this.req.currentUser.id)
      return exits.insufficientPrivilege();

    await Attachemnt.destroyOne(inputs.id);
    return exits.success();
  }

};
