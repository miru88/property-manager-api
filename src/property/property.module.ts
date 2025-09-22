import { Global, Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';



@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Property])],  
  controllers: [PropertyController],
  exports: [PropertyService],
  providers: [PropertyService]
})
export class PropertyModule {}
