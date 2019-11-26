module.exports = {

  friendlyName: 'Send template email',

  description: 'Send an email using a template.',

  inputs: {

    template: {
      description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
      extendedDescription:
        `Use strings like "foo" or "foo/bar", but NEVER "foo/bar.ejs".  For example, "marketing/welcome" would send an email
using the "views/emails/marketing/welcome.ejs" template.`,
      example: 'reset-password',
      type: 'string',
      required: true
    },

    templateData: {
      description: 'A dictionary of data which will be accessible in the EJS template.',
      type: {},
      defaultsTo: {}
    },

    to: {
      description: 'The email address of the primary recipient.',
      example: 'foo@bar.com',
      required: true
    },

    subject: {
      description: 'The subject of the email.',
      example: 'Hello there.',
      defaultsTo: ''
    },

    layout: {
      description:
        'Set to `false` to disable layouts altogether, or provide the path (relative ' +
        'from `views/layouts/`) to an override email layout.',
      defaultsTo: 'layout-email',
      custom: (layout) => layout === false || _.isString(layout)
    }

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

    var path = require('path');
    var url = require('url');
    var util = require('util');

    // Determine appropriate email layout and template to use.
    var emailTemplatePath = path.join('emails/', inputs.template);
    var layout;
    if (inputs.layout) {
      layout = path.relative(path.dirname(emailTemplatePath), path.resolve('layouts/', inputs.layout));
    } else {
      layout = false;
    }

    // Compile HTML template.
    // > Note that we set the layout, provide access to core `url` package (for
    // > building links and image srcs, etc.), and also provide access to core
    // > `util` package (for dumping debug data in internal emails).
    var htmlEmailContents = await sails.renderView(
      emailTemplatePath,
      Object.assign({ layout, url, util }, inputs.templateData)
    )
      .intercept((err) => {
        err.message =
          'Could not compile view template.\n' +
          '(Usually, this means the provided data is invalid, or missing a piece.)\n' +
          'Details:\n' +
          err.message;
        return err;
      });

    // Sometimes only log info to the console about the email that WOULD have been sent.
    // Specifically, if the "To" email address is anything "@example.com".
    var isToAddressConsideredFake = Boolean(inputs.to.match(/@example\.com$/i));

    if (sails.config.environment === 'test' || isToAddressConsideredFake) {
      sails.log(
        `Skipped sending email, either because the "To" email address ended in "@example.com"
          or because the current \`sails.config.environment\` is set to "test".

          But anyway, here is what WOULD have been sent:
          -=-=-=-=-=-=-=-=-=-=-=-=-= Email log =-=-=-=-=-=-=-=-=-=-=-=-=-
          To: ${inputs.to}
          Subject: ${inputs.subject}

          Body:
          ${htmlEmailContents}
          -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`
      );
    } else {

      await sails.helpers.mailgun.sendHtmlEmail.with({
        htmlMessage: htmlEmailContents,
        to: inputs.to,
        subject: inputs.subject,
        testMode: false
      });
    }

    return exits.success({
      loggedInsteadOfSending: isToAddressConsideredFake
    });

  }

};
