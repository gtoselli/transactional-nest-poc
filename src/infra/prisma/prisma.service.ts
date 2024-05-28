import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({ log: [{ level: 'query', emit: 'event' }] });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.$on('query', (e) => {
      const _e = e as Prisma.QueryEvent;
      this.logger.debug(`${_e.query} (${_e.duration}ms)`);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
