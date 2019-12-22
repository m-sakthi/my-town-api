module.exports = {

  friendlyName: 'Create',

  description: 'Create Device.',

  inputs: {
    title: {
      type: "string",
      required: true,
      description: "Title of the notification",
      example: "Order confirmed"
    },

    body: {
      type: "string",
      required: true,
      description: "Body of the notification",
      example: "You order on 2 shirts is confirmed. Thank you. Happy Shoping..!"
    },

    userIds: {
      type: 'string',
      required: true,
      description: 'Comma seperated User IDs',
      example: "1,2,3"
    },

    platform: {
      type: 'number',
      isIn: Object.keys(sails.config.custom.device).map(i => parseInt(i)),
      description: 'Platform OS of the device',
      example: 1,
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
    },

    notFound: {
      statusCode: 404,
      description: 'Not found',
    },

  },

  fn: async function (inputs, exits) {
    let devices = await Device.find(Object.assign({
      user: inputs.userIds.split(",").map(i => parseInt(i.trim()))
    }, inputs.platform ? { platform: inputs.platform } : {}));

    if (!devices.length) return exits.success({ error: "No devices found." });
    let registrationTokens = devices.map(d => d.token);

    var payload = {
      tokens: registrationTokens,
      notification: {
        title: inputs.title,
        body: inputs.body
      },
    };

    try {
      let response = await sails.config.notify.messaging().sendMulticast(payload)
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) failedTokens.push(registrationTokens[idx]);
        });
        return exits.success({ message: 'List of tokens that caused failures: ' + failedTokens })
      }
    } catch (error) {
      return exits.invalid({ error: "Error sending message:" + error })
    }

    return exits.success({ message: "Succeeded" });

  }

};
