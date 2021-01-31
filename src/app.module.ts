import { GraphQLModule } from '@nestjs/graphql';
import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from '@features/auth/auth.module';
import { UserModule } from '@features/users/user.module';
import { DateScalar } from '@features/common/scalars/date.scalar';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@config/configuration';
import {
  ConfigurationVariables,
  GraphqlConfig,
} from '@config/configuration.model';
import { LoggerModule } from '@features/common/services/logger/logger.module';
import { TraceLoggerService } from '@features/common/services/logger/trace-logger/trace-logger.service';
import { LoggerMiddleware } from '@features/common/services/logger/logger-middleware/logger.middleware';
import { WinstonLoggerService } from '@features/common/services/logger/winston-logger/winston-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<ConfigurationVariables>
      ) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    LoggerModule,
  ],
  providers: [
    DateScalar,
    {
      provide: Logger,
      useClass: WinstonLoggerService,
    },
    TraceLoggerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
