module.exports = {

  friendlyName: 'Show',

  description: 'Show Outlet.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Outlet ID',
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let outlet = await Outlet.findOne(inputs.id);
    if (!outlet) return exits.notFound({ error: 'Outlet not found' });

    let items = await sails.config.knex
      .select('item.name', 'item.overview', 'item.price',
        'outletitem.price as outletPrice', 'outletitem.overview as outletOverview')
      .from('item')
      .join('outletitem', 'outletitem.id', 'item.id')

    return exits.success({ ...outlet, items});
  }

};
