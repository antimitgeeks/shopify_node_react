// logger.js
const winston = require('winston');
const { NewRelicTransport } = require('@newrelic/winston-enricher');

const createLogger = (appName) => {
  // Replace with your actual New Relic license key
  const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY || 'YOUR_NEW_RELIC_LICENSE_KEY';

  // Create and return a logger instance with New Relic transport
  return winston.createLogger({
    level: 'info', // Adjust the log level as needed
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json() // New Relic expects logs to be in JSON format
    ),
    transports: [
      new winston.transports.Console(), // Console logging for development/debugging
      new NewRelicTransport({
        licenseKey: NEW_RELIC_LICENSE_KEY,
        apiUrl: 'https://log-api.newrelic.com/log/v1',
        application: appName, // Dynamically set the app name
      }),
    ],
  });
};

module.exports = createLogger;
