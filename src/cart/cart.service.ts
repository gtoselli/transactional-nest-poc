import { CartRepo } from './cart.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepo) {}

  public async initCart(params: { customerName: string }) {
    const { id } = await this.cartRepo.create(params);

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
