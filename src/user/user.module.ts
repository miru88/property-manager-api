import { Module, Global } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],  
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
