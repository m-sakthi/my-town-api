module.exports = {

  friendlyName: 'Create',

  description: 'Create Cart.',

  inputs: {
    itemId: {
      type: 'number',
      required: true,
      description: 'Item Id',
      example: 123
    },

    quantity: {
      type: 'number',
      description: 'No of items to be added.',
      defaultsTo: 1,
      example: 1
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

    combintaionAlreadyExists: {
      status: 400,
      description: 'Combintaion already exists',
    }

  },

  fn: async function (inputs, exits) {
    let item = await Item.findOne(inputs.itemId);
    if (!item) return exits.notFound({ error: 'Item not found' });

    const currentUserId = this.req.currentUser.id;

    let record = await Cart.findOne({
      item: inputs.itemId,
      user: currentUserId
    });

    if (record) {
      await Cart.updateOne(record.id)
        .set({ quantity: record.quantity + 1 })
        .intercept({ name: 'UsageError' }, 'invalid');
    } else {
      record = await Cart.create({
        item: inputs.itemId,
        user: currentUserId
      }).fetch();
    }

    return exits.success(record);
  }

};
