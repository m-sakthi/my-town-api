module.exports = {

  friendlyName: 'Create',

  description: 'Create Cart.',

  inputs: {
    itemIds: {
      type: 'json',
      required: true,
      description: 'Item Ids with quantity',
      example: { 123: 1, 124: 3, 125: 4 }
    },

    // quantity: {
    //   type: 'number',
    //   description: 'No of items to be added.',
    //   defaultsTo: 1,
    //   example: 1
    // },

    addressId: {
      type: 'number',
      required: true,
      example: 1
    }
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

    const items = await sails.config.knex('item')
      .whereIn('id', Object.keys(inputs.itemIds).map(i => parseInt(i)));

    if (!items)
      return exits.notFound({ error: 'Item(s) not found.' });

    const address = await Address.findOne(inputs.addressId);
    if (!address)
      return exits.notFound({ error: 'Address not found.' });

    let order = await Order.create({
      totalPrice: parseFloat(items.map(i => parseFloat(i.price)).reduce((i, j) => i + j, 0)),
      address: inputs.addressId,
      user: this.req.currentUser.id,
      status: 'active'
    }).intercept({ name: 'UsageError' }, 'invalid').fetch();

    const values = items.map(i => ({
      order: order.id,
      item: i.id,
      quantity: parseFloat(inputs.itemIds[i.id])
    }));

    await sails.config.knex.insert(values).into('orderitem');

    exits.success({ ...order, items });

  }

};
