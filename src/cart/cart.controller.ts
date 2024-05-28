import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

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
}
