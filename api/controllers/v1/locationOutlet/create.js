module.exports = {

  friendlyName: 'Create',

  description: 'Create LocationOutlet.',

  inputs: {
    outletId: {
      type: 'number',
      required: true,
      description: 'Outlet Id',
      example: 123
    },

    locationId: {
      type: 'number',
      required: true,
      description: 'Location ID',
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
    let outlet = await Outlet.findOne(inputs.outletId);
    if (!outlet) {
      return exits.notFound({ error: 'Outlet not found' });
    }

    let location = await Location.findOne(inputs.locationId);
    if (!location) {
      return exits.notFound({ error: 'Category not found' });
    }

    let itemRecord = await LocationOutlet.findOne({
      outlet: inputs.outletId,
      location: inputs.locationId
    })
    if (itemRecord) {
      return exits.combintaionAlreadyExists({ error: 'Location-Outlet combination already exists' });
    }

    let newRecord = await LocationOutlet.create({
      outlet: inputs.outletId,
      location: inputs.locationId
    })
      .intercept('E_UNIQUE', 'combintaionAlreadyExists')
      .fetch();

    return exits.success(newRecord);

  }

};
module.exports = {

  friendlyName: 'Create',

  description: 'Create OutletCategory.',

  inputs: {
    outlet: {
      type: 'number',
      required: true,
      description: 'Outlet Id',
      example: 123
    },

    category: {
      type: 'number',
      required: true,
      description: 'Category ID',
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
    let outlet = await Outlet.findOne(inputs.outlet);
    if (!outlet) return exits.notFound({ error: 'Outlet not found' });

    let category = await Category.findOne(inputs.category);
    if (!category) return exits.notFound({ error: 'Category not found' });

    let record = await OutletCategory.findOne({
      outlet: inputs.outlet,
      category: inputs.category
    })

    if (record) return exits.combintaionAlreadyExists({
      error: 'Outlet-Category combination already exists'
    });

    record = await OutletCategory.create({
      outlet: inputs.outlet,
      category: inputs.category
    })
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .fetch();

    return exits.success(record);

  }

};
