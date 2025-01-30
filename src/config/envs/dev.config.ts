export default () => ({
  applicationName: 'Decor',
  version: process.env.VERSION || 'latest',
  env: process.env.ENV_NAME,
  NODE_ENV: 'dev',
  port: parseInt(process.env.PORT || '3000', 10),
  logLevel: 'debug',
  baseUrl: process.env.BASE_URL,
  database: {
    url: process.env.MONGODB_URL,
  },
});
