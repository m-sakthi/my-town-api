module.exports = {


  friendlyName: 'Update',


  description: 'Update category.',


  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Item ID',
    },

    overview: {
      type: 'string',
      description: 'Offered amenities can be described',
      example: 'Haircut will be provided with Hairwash'
    },

    price: {
      type: 'number',
      description: 'Price for the item offered by outlet',
      example: 100.50
    },

    outlet: {
      type: 'number',
      description: 'Outlet Id',
      example: 123
    },

    item: {
      type: 'number',
      description: 'Item ID',
      example: 12,
    }
  },


  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    nameAlreadyInUse: {
      statusCode: 400,
      description: 'The provided name is already in use.',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },


  fn: async function (inputs, exits) {
    let outletItem = await OutletItem.findOne(inputs.id);
    if (!outletItem) return exits.notFound({ error: 'OutletItem not found' });

    let payload = {};
    if (inputs.outlet != undefined) {
      let outlet = await Outlet.findOne(inputs.outlet);
      if (!outlet) return exits.notFound({ error: 'Outlet not found' });

      payload = Object.assign(payload, { outlet: inputs.outlet });
    }

    if (inputs.item != undefined) {
      let item = await Item.findOne(inputs.item);
      if (!item) return exits.notFound({ error: 'Item not found' });

      payload = Object.assign(payload, { item: inputs.item });
    }

    if (inputs.price != undefined)
      payload = Object.assign(payload, { price: inputs.price });


    if (inputs.overview != undefined)
      payload = Object.assign(payload, { overview: inputs.overview });


    let updatedRecord = await OutletItem.update(inputs.id)
      .set(payload)
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid');

    return exits.success(updatedRecord);

  }


};

