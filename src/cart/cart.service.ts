import { CartRepo } from './cart.repo';
import { Injectable } from '@nestjs/common';
import { InboxService } from '../infra/inbox/inbox.service';
import { Transactional } from '@nestjs-cls/transactional';
import { OutboxService } from '../infra/outbox/outbox.service';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepo,
    private readonly inboxService: InboxService,
    private readonly outboxService: OutboxService,
  ) {}

  @Transactional()
  public async initCart(params: { customerName: string }) {
    const { id } = await this.cartRepo.create(params);

    await this.inboxService.addHandledMessage(id);
    await this.outboxService.scheduleMessages([
      { type: 'CartInitialized', cartId: id },
    ]);

    return { cartId: id };
  }

  async listAllCarts() {
    const allCarts = await this.cartRepo.findMany();
    return allCarts.map((cart) => ({
      cartId: cart.id,
      customerName: cart.customerName,
    }));
  }
}
