import { PrismaService } from '../prisma/prisma.service';

export class InboxService {
  constructor(private readonly prismaService: PrismaService) {}

  public async addHandledMessage(messageId: string): Promise<void> {
    await this.prismaService.inboxMessage.create({ data: { messageId } });
  }

  public async messageHandled(messageId: string): Promise<boolean> {
    return !!(await this.prismaService.inboxMessage.findUnique({
      where: { messageId },
    }));
  }
}
