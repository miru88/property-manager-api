import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Property } from 'src/entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PropertyService {

  constructor(@InjectRepository(Property)
            private readonly propertyRepository: Repository<Property>,
            private readonly userService: UsersService
            ) {}

  private properties = [
    {
      propertyId: 1,
      propertyname: 'test',
      password: bcrypt.hashSync('1234', 10), // hashed password
    },
  ];

  async findOne(propertyname: string, propertyAddress) {
    return await this.propertyRepository.findOne({where:{name: propertyname, address: propertyAddress}});
  }

  async createproperty(name: string, address: string, userId: number) {

    const property = await this.propertyRepository.findOne({ where: { address: address, userId: userId } });

    if (property) {
      throw new ConflictException('Property with this information already exists');
    }

    const newproperty = this.propertyRepository.create({ name: name, address: address, userId: userId});

    return this.propertyRepository.save(newproperty);
  }

  async associatePropertyWithUser(propertyId: number, userId: number) {

    const property: Property | null = await this.propertyRepository.findOneBy({id:propertyId});

    if(!property) {
      throw new NotFoundException(`Property with id ${propertyId} not found`);
    }

    const user: User | null= await this.userService.findUserById(userId);

    if(!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    Object.assign(property, {userId: userId});

    return this.propertyRepository.save(property);

  }


    async getAllProperties() {
      return await this.propertyRepository.find();
    }

    async getallPropertiessById(ids: number[]) {
      return await this.propertyRepository.find({where:{id: In(ids)}});
    }



}
