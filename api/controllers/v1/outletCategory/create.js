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
    var outlet = await Outlet.findOne(inputs.outlet);
    if (!outlet) {
      return exits.notFound({ error: 'Outlet not found' });
    }
    
    var category = await Category.findOne(inputs.category);
    if (!category) {
      return exits.notFound({ error: 'Category not found' });
    }

    var itemRecord = await OutletCategory.findOne({
      outlet: inputs.outlet,
      category: inputs.category
    })
    if (itemRecord) {
      return exits.combintaionAlreadyExists({ error: 'Outlet-Category combination already exists' });
    }


    var newItemRecord = await OutletCategory.create({
      outlet: inputs.outlet,
      category: inputs.category
    })
    .intercept('E_UNIQUE', 'nameAlreadyInUse')
    .fetch();

    return exits.success(newItemRecord);

  }

};
