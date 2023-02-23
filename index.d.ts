import { Logger } from 'winston';
const logger: Logger;
export default logger;
export function colorize(colors: string[], text: string): string;
export function bold(text: string): string;
export function dim(text: string): string;
export function boldDim(text: string): string;
export function white(text: string): string;
export function red(text: string): string;
export function green(text: string): string;
export const ColorCodes: {
    reset: string;
    bold: string;
    dim: string;
    italic: string;
    underlined: string;
    inverse: string;
    strikethrough: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    bgBlack: string;
    bgRed: string;
    bgGreen: string;
    bgYellow: string;
    bgBlue: string;
    bgMagenta: string;
    bgCyan: string;
    bgWhite: string;
};
