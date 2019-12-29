module.exports = {

  friendlyName: 'Delete',

  description: 'Delete Cart Item.',

  inputs: {

    itemId: {
      type: 'number',
      required: true,
      description: 'Item Id',
      example: 123
    },

  },

  exits: {

    insufficientPrivilege: {
      responseType: 'forbidden',
    },

    notFound: {
      responseType: 'notFound',
    },

  },

  fn: async function (inputs, exits) {
    const cart = Cart.findOne({ item: inputs.itemId, user: this.req.currentUser.id });
    if (!cart)
      return exits.notFound({ error: 'Item not found on Cart' })
    
    if (cart.user !== this.req.currentUser.id)
      return exits.insufficientPrivilege();

    await Cart.destroy({ item: inputs.itemId, user: this.req.currentUser.id });
    return exits.success();
  }

};
