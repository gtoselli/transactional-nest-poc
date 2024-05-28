import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, CartModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
