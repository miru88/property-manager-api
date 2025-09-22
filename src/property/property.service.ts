import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Property } from 'src/entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PropertyService {

  constructor(@InjectRepository(Property)
            private readonly propertyRepository: Repository<Property>) {}

  private properties = [
    {
      propertyId: 1,
      propertyname: 'test',
      password: bcrypt.hashSync('1234', 10), // hashed password
    },
  ];

  async findOne(propertyname: string) {
    return this.properties.find(property => property.propertyname === propertyname);
  }

  async createproperty(name: string, address: string, userId: number) {

    const property = await this.propertyRepository.findOne({ where: { address: address, userId: userId } });

    if (property) {
      throw new ConflictException('Property with this information already exists');
    }

    const newproperty = this.propertyRepository.create({ name: name, address: address, userId: userId});

    return this.propertyRepository.save(newproperty);
  }


}
