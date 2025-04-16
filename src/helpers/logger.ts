import winston from 'winston';

const logConfiguration = {
  transports: [
    new winston.transports.Console({ level: 'warn' }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/errors.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    winston.format.printf(info => {
      const logMessage = `${info.level}: message: ${info.message}: ${[info.timestamp]}`;
      // Add stack trace if available
      if (info.stack) {
        return `${logMessage}\nStack trace: ${info.stack}`;
      }
      return logMessage;
    }),
  ),
};

export default winston.createLogger(logConfiguration);
