import assert from 'assert';
import logger from '../index.js';
import { existsSync } from 'fs';

describe('Logger', () => {
    describe('Console', () => {
        it('print messages', () => {
            logger.error('message');
            logger.warn('message');
            logger.info('message');
            logger.http('message');
            logger.verbose('message');
            logger.debug('message');
            logger.silly('message');
        });
    });
    describe('Files', () => {
        it('error file', async () => {
            logger.error('write to file');
            assert.ok(existsSync('logs/error.log'));
        });
        it('info file', async () => {
            logger.info('write to file');
            assert.ok(existsSync('logs/info.log'));
        });
        it('http file', async () => {
            logger.http('write to file');
            assert.ok(existsSync('logs/http.log'));
        });
    });
});
