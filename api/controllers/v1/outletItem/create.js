module.exports = {


  friendlyName: 'Create',


  description: 'Create OutletItem.',


  inputs: {
    overview: {
      type: 'string',
      description: 'Offered amenities can be described',
      example: 'Haircut will be provided with Hairwash'
    },

    price: {
      type: 'number',
      required: true,
      description: 'Price for the item offered by outlet',
      example: 100.50
    },

    outlet: {
      type: 'number',
      required: true,
      description: 'Outlet Id',
      example: 123
    },

    item: {
      type: 'number',
      required: true,
      description: 'Item ID',
      example: 12,
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

    combintaionAlreadyExists: {
      status: 400,
      description: 'Combintaion already exists',
    }

  },


  fn: async function (inputs, exits) {
    var outlet = await Outlet.findOne(inputs.outlet);
    if (!outlet) {
      return exits.notFound({ error: 'Outlet not found' });
    }

    var item = await Item.findOne(inputs.item);
    if (!item) {
      return exits.notFound({ error: 'Item not found' });
    }

    var outletItemRecord = await OutletItem.findOne({
      outlet: inputs.outlet,
      item: inputs.item,
    })
    if (outletItemRecord) {
      return exits.combintaionAlreadyExists({ error: 'Outlet-Item combination already exists' });
    }


    var newOutletItemRecord = await OutletItem.create({
      outlet: inputs.outlet,
      item: inputs.item,
      price: inputs.price,
      overview: inputs.overview,
    })
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch();

    return exits.success(newOutletItemRecord);

  }

};
