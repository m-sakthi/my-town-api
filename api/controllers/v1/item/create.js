module.exports = {


  friendlyName: 'Create',


  description: 'Create Item.',


  inputs: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the Item Name',
      maxLength: 120,
      example: 'Provosion'
    },

    overview: {
      type: 'string',
      required: true,
      description: 'Some overview about that Item',
      example: 'All Provosional items will be available',
    },
    
    price: {
      type: 'string',
      required: true,
      description: 'Price for the item',
      example: '100',
    },

    categoryId: {
      type: 'number',
      required: true,
      description: 'Category to which the items is tagged to',
      example: 12,
    },

    serviceable: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Items is serviceable',
      example: true,
    },

    deliverable: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Items is deliverable',
      example: true,
    },
  },


  exits: {
    invalid: {
      responseType: 'errorHandler',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },


  fn: async function (inputs, exits) {
    let category = await Category.findOne(inputs.categoryId);
    if (!category) {
      return exits.notFound({ error: 'Category not found' });
    }

    let newItemRecord = await Item.create({
      name: inputs.name,
      overview: inputs.overview,
      price: inputs.price,
      category: inputs.categoryId
    })
      .intercept(err => { exits.invalid(err) })
      .fetch();

    return exits.success(newItemRecord);

  }

};
