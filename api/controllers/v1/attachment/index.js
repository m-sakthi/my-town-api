module.exports = {

  friendlyName: 'List',

  description: 'List Attachments.',

  inputs: {

  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },
  },

  fn: async function (inputs, exits) {
    var records = await Attachment.find();
    return exits.success(records);
  }

};
