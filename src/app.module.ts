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
  DatabaseConfig,
} from '@config/configuration.model';
import { LoggerMiddleware } from '@features/common/services/logger/logger-middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationExceptionFilter } from '@features/common/filters/application-exception/application-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationVariables>) => {
        const databaseConfig = configService.get<DatabaseConfig>('database');
        return {
          type: 'mongodb',
          host: databaseConfig.host,
          port: databaseConfig.port,
          database: databaseConfig.database,
          autoLoadEntities: true,
          synchronize: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
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
