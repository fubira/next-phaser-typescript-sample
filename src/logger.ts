import consola from 'consola';

export const logger = consola.create({
  level: process.env.NODE_ENV === 'production' ? 0 : 4,
});

export default logger;
