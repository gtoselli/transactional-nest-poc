import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Transactional } from '@nestjs-cls/transactional';
import { InboxService } from '../infra/inbox/inbox.service';

@Controller('carts')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly inboxService: InboxService,
  ) {}

  @Post('')
  public async initCart(@Body() body: any) {
    if (!body.customerName)
      throw new BadRequestException('customerName is required');

    const { customerName } = body;
    return await this.cartService.initCart({ customerName });
  }

  @Get()
  public async listAllCarts() {
    return await this.cartService.listAllCarts();
  }

  @Delete()
  @Transactional()
  public async deleteCart(@Body() body: any) {
    if (!body.cartId) throw new BadRequestException('cartId is required');
    if (!body.messageId) throw new BadRequestException('messageId is required');

    if (await this.inboxService.messageHandled(body.messageId)) {
      return { message: 'Message already handled' };
    }

    await this.cartService.deleteCart(body.cartId);
    await this.inboxService.addHandledMessage(body.messageId);
  }
}
