export default () => ({
  applicationName: 'Base',
  version: process.env.VERSION || 'latest',
  env: process.env.ENV_NAME,
  NODE_ENV: 'local',
  port: parseInt(process.env.PORT || '5000', 10),
  logLevel: 'debug',
  baseUrl: process.env.BASE_URL,
  database: {
    url: process.env.MONGODB_URL,
  },
});
