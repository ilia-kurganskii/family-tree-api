import { CommonModule } from '@features/common/common.module';
import { FamilyTreeModule } from '@features/family-tree/family-tree.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from '@features/auth/auth.module';
import { UserModule } from '@features/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@config/configuration';
import {
  ConfigurationVariables,
  GraphqlConfig,
} from '@config/configuration.model';
import { LoggerMiddleware } from '@features/common/services/logger/logger-middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationExceptionFilter } from '@features/common/filters/application-exception.filter';

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
    CommonModule,
    FamilyTreeModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
