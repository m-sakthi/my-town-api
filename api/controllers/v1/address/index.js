module.exports = {

  friendlyName: 'List',

  description: 'List Addresses.',

  inputs: {

    parentType: {
      type: 'string',
      isIn: ['user', 'outlet', 'locationoutlet'],
      description: 'Parent Type can be user/outlet/locationoutlet',
      example: 'user'
    },

    parentId: {
      type: 'number',
      description: 'User/Outlet/LocationOutlet ID',
      example: 1
    }

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    let criteria = {};
    if (inputs.parentType)
      criteria = { parentType: inputs.parentType };

    if (inputs.parentId)
      criteria = { ...criteria, parentId: inputs.parentId };

    var records = await Address.find(criteria);
    return exits.success(records);
  }

};
