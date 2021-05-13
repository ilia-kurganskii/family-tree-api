export interface ConfigurationVariables {
  nest: NestConfig;
  logger: LoggerConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface LoggerConfig {
  database: {
    query: boolean;
    info: boolean;
    warn: boolean;
  };
}

export interface CorsConfig {
  enabled: boolean;
  origins: string[];
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: number;
  jwtSecret: string;
  jwtIssuer: string;
  bcryptSaltOrRound: string | number;
  https: boolean;
}
