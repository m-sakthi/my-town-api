module.exports = {


  friendlyName: 'Update',


  description: 'Update Attachement.',


  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'Attachement ID',
    },

    nature: {
      type: 'number',
      defaultsTo: 1,
      isIn: [1, 2, 3], // 1 -> unclassified, 2 -> banner, 3 -> gallery
      description: 'Nature or Type of image',
    },

  },


  exits: {
    invalid: {
      responseType: 'errorHandler',
    },

    notFound: {
      responseType: 'notFound',
    },

  },


  fn: async function (inputs, exits) {
    let attachment = await Attachement.findOne(inputs.id);
    if (!attachment) return exits.notFound({ error: 'Attachement not found' });

    if (inputs.nature)
      attachment = await Attachement.updateOne(inputs.id)
        .set({ nature: inputs.nature })
        .intercept(err => { exits.invalid(err) })

    return exits.success(attachment);

  }


};

