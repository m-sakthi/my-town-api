module.exports = {

  friendlyName: 'Show',

  description: 'Show user.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'User ID',
    },
  },

  exits: {
    notFound: {
      statusCode: 404,
      description: 'Not found',
    },
  },

  fn: async function (inputs, exits) {

    var user = await User.findOne(inputs.id);

    if (!user)
      return exits.notFound({ error: 'User not found' });

    return exits.success(user);

  }

};
