import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepo {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(params: { customerName: string }) {
    const { id } = await this.prismaService.cart.create({
      data: params,
      select: { id: true },
    });

    return { id };
  }

  public async findMany() {
    return this.prismaService.cart.findMany({});
  }
}
