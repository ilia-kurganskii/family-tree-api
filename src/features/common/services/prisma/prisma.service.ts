import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  LoggerConfig,
} from '@config/configuration.model';

function buildPrismaOptions(config: LoggerConfig): PrismaClientOptions {
  const options: PrismaClientOptions = {
    log: [],
  };
  if (config?.database?.query) {
    options.log.push({
      emit: 'event',
      level: 'query',
    });
  }
  if (config?.database?.info) {
    options.log.push({
      emit: 'event',
      level: 'info',
    });
  }
  if (config?.database?.warn) {
    options.log.push({
      emit: 'event',
      level: 'warn',
    });
  }
  return options;
}

@Injectable()
export class PrismaService
  extends PrismaClient<PrismaClientOptions>
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(
    private readonly configService: ConfigService<ConfigurationVariables>
  ) {
    super(buildPrismaOptions(configService.get<LoggerConfig>('logger')));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('info', (e) => this.logger.log(e));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', (e) => this.logger.log(e));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('warn', (e) => this.logger.log(e));
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
