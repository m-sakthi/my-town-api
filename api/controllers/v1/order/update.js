module.exports = {

  friendlyName: 'Update',

  description: 'Update Order.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      description: 'Order ID',
    },

    status: {
      type: 'string',
      required: true,
      isIn: ['active', 'dispatched', 'delivered', 'cancelled']
    },

    notes: {
      type: 'string',
      description: 'Some additional notes needs can be added',
    },

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    notFound: {
      responseType: 'notFound',
    },

  },

  fn: async function (inputs, exits) {
    let order = await Order.findOne(inputs.id);
    if (!order) return exits.notFound({ error: 'Order not found' });

    order = await Order.updateOne(inputs.id)
      .set(inputs)
      .intercept({ name: 'UsageError' }, 'invalid')

    return exits.success(order);
  }

};

