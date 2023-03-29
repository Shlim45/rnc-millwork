const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? `http://localhost:3000` : 'https://www.rccustommillworks.com';

export const isInDevMode = () => dev;