import winston from 'winston';

const logConfiguration = {
    transports: [
        new winston.transports.Console({ level: 'warn' }),
        new winston.transports.File({
            level: 'error',
            filename: 'logs/errors.log'
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: message: ${info.message}: ${[info.timestamp]}`)
    )
};

export default winston.createLogger(logConfiguration);
