import { Module, Global } from '@nestjs/common';
import { UsersService } from './user.service';

@Global()
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
