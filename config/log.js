/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */

var winston = require('winston');
var customLogger = new winston.createLogger();

// A file based transport logging only errors formatted as json.
customLogger.add(new winston.transports.File({
  level: 'info',
  filename: 'application.log',
  json: true,
  colorize: true
}));

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  // Pass in our custom logger, and pass all log levels through.
  custom: customLogger,

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false,

};
