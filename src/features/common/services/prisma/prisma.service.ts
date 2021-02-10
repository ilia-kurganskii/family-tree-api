import { CLS_NAMESPACE } from '@features/common/services/logger/logger.const';
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
  Inject,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import {
  ConfigurationVariables,
  LoggerConfig,
} from '@config/configuration.model';
import { Namespace } from 'cls-hooked';

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
  private readonly logger = new Logger(PrismaService.name, true);
  constructor(
    private readonly configService: ConfigService<ConfigurationVariables>,
    @Inject(CLS_NAMESPACE) private readonly clsNamespace: Namespace
  ) {
    super(buildPrismaOptions(configService.get<LoggerConfig>('logger')));
    this.logEvent = clsNamespace.bind(this.logEvent);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('info', this.logEvent);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', this.logEvent);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('warn', this.logEvent);
  }

  logEvent(event: any) {
    this.logger.log(event);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
