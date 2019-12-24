module.exports = {

  friendlyName: 'Profile',

  description: 'Fetches current user profile.',

  inputs: {

  },

  exits: {

  },

  fn: async function (inputs, exits) {

    const { currentUser } = this.req;
    return exits.success(currentUser);

  }

};
