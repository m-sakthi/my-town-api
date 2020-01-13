module.exports = {

  friendlyName: 'Profile',

  description: 'Fetches current user profile.',

  inputs: {

  },

  exits: {

  },

  fn: async function (inputs, exits) {

    const { currentUser } = this.req;
    const location = await Location.findOne({ id: currentUser.location });
    return exits.success({ ...currentUser, location });

  }

};
