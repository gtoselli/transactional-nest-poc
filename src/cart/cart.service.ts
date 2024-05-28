import { CartRepo } from './cart.repo';
import { Injectable } from '@nestjs/common';
import { OutboxService } from '../infra/outbox/outbox.service';
import { Transactional } from '@nestjs-cls/transactional';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepo,
    private readonly outboxService: OutboxService,
  ) {}

  @Transactional()
  public async initCart(params: { customerName: string }) {
    const { id } = await this.cartRepo.create(params);

    await this.outboxService.scheduleMessages([
      { type: 'CartInitialized', cartId: id },
    ]);

    return { cartId: id };
  }

  public async deleteCart(cartId: string) {
    await this.cartRepo.update(cartId, { deleted: true });
  }

  async listAllCarts() {
    const allCarts = await this.cartRepo.findMany();
    return allCarts.map((cart) => ({
      cartId: cart.id,
      customerName: cart.customerName,
    }));
  }
}
