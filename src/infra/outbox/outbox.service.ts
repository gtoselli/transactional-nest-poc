import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

@Injectable()
export class OutboxService {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async scheduleMessages(messages: any[]): Promise<void> {
    await this.txHost.tx.outboxMessage.createMany({
      data: messages.map((message) => ({ message: JSON.stringify(message) })),
    });
  }
}
