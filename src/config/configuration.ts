import { ConfigurationVariables } from './configuration.model';

const configuration: ConfigurationVariables = {
  nest: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
  },
  logger: {
    database: {
      info: process.env.LOGGER_DATABASE_INFO_ENABLED === 'true',
      query: process.env.LOGGER_DATABASE_QUERY_ENABLED === 'true',
      warn: process.env.LOGGER_DATABASE_WARN_ENABLED === 'true',
    },
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
    title: process.env.SWAGGER_TITLE || 'Family Tree Documentation',
    description: '',
    version: process.env.SWAGGER_VERSION || '1.0',
    path: process.env.SWAGGER_PATH || 'api',
  },
  graphql: {
    playgroundEnabled: process.env.GRAPHQL_ENABLED === 'true',
    debug: process.env.GRAPHQL_DEBUG === 'true',
    schemaDestination:
      process.env.GRAPHQL_SCHEMA_DESCTINATION || './src/schema.graphql',
    sortSchema: process.env.GRAPHQL_SORT_SCHEMA === 'true',
  },
  security: {
    expiresIn: process.env.SECURITY_EXPRESS_IN || '2m',
    refreshIn: process.env.SECURITY_REFRESH_IN || '7d',
    bcryptSaltOrRound: process.env.SECURITY_SALT || 10,
    jwtSecret: process.env.SECURITY_JWT_SECRET || 'jwt-secret',
  },
};

export default (): ConfigurationVariables => configuration;
