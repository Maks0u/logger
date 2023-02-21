import winston from 'winston';

const defaultFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize(),
    winston.format.printf((log) => `\x1b[0;2m${log.timestamp} \u00b7 \x1b[0m${log.level}\x1b[0;2m \u00b7 ${log.message}\x1b[0m`)
);

const httpFilter = winston.format((log) => {
    return /http/.test(log.level) ? log : false;
});

const transports = function (logLevel) {
    const transports = [
        new winston.transports.File({
            filename: 'logs/debug.log',
            maxsize: 500000,
            maxFiles: 3,
            level: 'debug',
        }),
        new winston.transports.File({
            filename: 'logs/http.log',
            maxsize: 500000,
            maxFiles: 3,
            level: 'http',
            format: winston.format.combine(httpFilter(), defaultFormat),
        }),
        new winston.transports.File({
            filename: 'logs/info.log',
            maxsize: 500000,
            maxFiles: 3,
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            maxsize: 500000,
            maxFiles: 3,
            level: 'warn',
        }),
    ];
    if (logLevel) {
        logLevel = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'].includes(logLevel) ? logLevel : 'info';
        transports.push(
            new winston.transports.Console({
                level: logLevel,
            })
        );
    }
    return transports;
};

export default winston.createLogger({
    format: defaultFormat,
    transports: transports(process.env.LOG_LEVEL),
});
