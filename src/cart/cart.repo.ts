import { PrismaService } from '../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { v4 } from 'uuid';

@Injectable()
export class CartRepo {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async create(params: { customerName: string }) {
    const id = v4();
    await this.txHost.tx.cart.create({
      data: { ...params, id },
    });

    return { id };
  }

  public async update(
    cartId: string,
    params: { customerName?: string; deleted?: boolean },
  ) {
    return this.prismaService.cart.update({
      where: { id: cartId },
      data: params,
    });
  }

  public async findMany() {
    return this.prismaService.cart.findMany({});
  }
}
