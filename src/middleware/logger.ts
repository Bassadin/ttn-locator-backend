import pino from 'pino';
import pretty from 'pino-pretty';

let loggerOptions = {};

if (process.env.NODE_ENV === 'TEST') {
    // https://github.com/pinojs/pino-pretty#usage-with-jest
    loggerOptions = pretty({ sync: true });
}

const logger = pino(loggerOptions);

logger.info(`Logger initialized, using options: ${JSON.stringify(loggerOptions)}`);

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
    logger.level = 'debug';
}

if (process.env.NODE_ENV === 'TEST') {
    logger.level = 'debug';
}

logger.info(`Logger initialized, running in ${process.env.NODE_ENV} mode`);

export default logger;
