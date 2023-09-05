const dev = process.env.NODE_ENV !== 'production';

export const isInDevMode = () => dev;
