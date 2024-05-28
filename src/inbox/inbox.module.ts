import { Global, Module } from '@nestjs/common';
import { InboxService } from './inbox.service';

@Global()
@Module({
  providers: [InboxService],
  exports: [InboxService],
})
export class InboxModule {}
