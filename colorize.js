/**
 * @param {String[]} colors
 * @param {String} text
 */
export default function colorize(colors, text) {
    const reset = '0';
    return `\x1b[0m\x1b[${colors.reduce((a, b) => `${a};${b}`)}m${text}\x1b[${reset}m`;
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

export function white(text) {
    return colorize([ColorCodes.reset], text);
}

export function red(text) {
    return colorize([ColorCodes.red], text);
}

export function green(text) {
    return colorize([ColorCodes.green], text);
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
