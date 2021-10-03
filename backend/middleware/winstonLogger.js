const winston = require("winston")
const expressWinston = require("express-winston")
const {DateTime} = require("luxon")

const winstonLogger = expressWinston.logger({
    transports: [
      //Creates new logs file for everyday via Luxon
      new winston.transports.File({ filename: `logs/${DateTime.local().toFormat("yyyy-MM-dd").toString()}.log` }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    //ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  });

module.exports = winstonLogger