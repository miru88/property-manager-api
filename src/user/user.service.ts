import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
            private readonly userRepository: Repository<User>) {}

  private users = [
    {
      userId: 1,
      username: 'test',
      password: bcrypt.hashSync('1234', 10), // hashed password
    },
  ];

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({where:{email:email}});
  }

  async findUserById(userId: number) {
    return await this.userRepository.findOne({where:{id:userId}});
  }

  async createUser(email: string, password: string) {

    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ email, password: hashedPassword });

    return this.userRepository.save(newUser);
  }

    // deleteUser() {

    // }

    // updateUser() {

    // }

    async getAllUsers() {
      return await this.userRepository.find();
    }

    async getallUsersByEmail(emails: string[]) {
      return await this.userRepository.find({where:{email: In(emails)}});
    }

        async getallUsersById(ids: number[]) {
      return await this.userRepository.find({where:{id: In(ids)}});
    }

  }