import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InboxService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async addHandledMessage(messageId: string): Promise<void> {
    await this.txHost.withTransaction(async () => {
      await this.txHost.tx.inboxMessage.create({ data: { messageId } });
    });
  }

  public async messageHandled(messageId: string): Promise<boolean> {
    return !!(await this.prismaService.inboxMessage.findUnique({
      where: { messageId },
    }));
  }
}
