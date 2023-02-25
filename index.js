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
export function colorize(colors, text) {
    return `\x1b[0m\x1b[${colors.reduce((a, b) => `${a};${b}`)}m${text}\x1b[0m`;
}
export function bold(text) {
    return colorize([ColorCodes.bold], text);
}
export function dim(text) {
    return colorize([ColorCodes.dim], text);
}
export function boldDim(text) {
    return colorize([ColorCodes.bold, ColorCodes.dim], text);
}
export function italic(text) {
    return colorize([ColorCodes.italic], text);
}
export function inverse(text) {
    return colorize([ColorCodes.inverse], text);
}
export function red(text) {
    return colorize([ColorCodes.red], text);
}
export function green(text) {
    return colorize([ColorCodes.green], text);
}
export function white(text) {
    return colorize([ColorCodes.white], text);
}
export const ColorCodes = {
    reset: '0',
    bold: '1',
    dim: '2',
    italic: '3',
    underlined: '4',
    inverse: '7',
    strikethrough: '9',
    black: '30',
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',
    white: '37',
    bgBlack: '40',
    bgRed: '41',
    bgGreen: '42',
    bgYellow: '43',
    bgBlue: '44',
    bgMagenta: '45',
    bgCyan: '46',
    bgWhite: '47',
};
