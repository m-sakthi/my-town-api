module.exports = {

  friendlyName: 'Send template email',

  description: 'Send an email using a template.',

  inputs: {

    id: {
      required: true,
      type: 'number',
    },

    mobileNo: {
      required: true,
      type: 'string',
    },

  },


  exits: {

    success: {
      outputFriendlyName: 'Email delivery report',
      outputDescription: 'A dictionary of information about what went down.',
      outputType: {
        loggedInsteadOfSending: 'boolean'
      }
    }

  },


  fn: async function (inputs, exits) {

    const token = User.generateToken();
    try {
      // await sails.config.AWS.sns.publish({
      //   Message: 'OTP for My Town is ' + token,
      //   PhoneNumber: inputs.mobileNo,
      // }).promise();

      await sails.config.twilioClient.messages.create({
        from: sails.config.custom.fromMobileNumbers,
        to: inputs.mobileNo,
        body: 'OTP for My Town is ' + token
      });

      await User.updateOne(inputs.id).set({
        mobileVerificationToken: token,
        mobileVerificationStatus: 1
      });
      
      return exits.success({ message: 'Succesfully sent.' });
    } catch (err) {
      console.log('Error while sending mobile verification. ' + err)
      throw 'Error while sending mobile verification. ' + err;
    }

  }

};
