import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { TABLE_USERS } from '../../app.constants';

@Injectable()
export default class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const users = await this.knex.table('users');
    return { users };
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException(`User id is required`);
    }
    const users = await this.knex.table(TABLE_USERS).where('id', id);
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      // NOTE: In real scenario we would store a password hash instead
      const users = await this.knex.table(TABLE_USERS).insert(
        {
          email: createUserDto.email,
          password: createUserDto.password,
        },
        ['id', 'email'],
      );

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table(TABLE_USERS).where('id', id).update(
        {
          email: updateUserDto.email,
          password: updateUserDto.password,
        },
        ['id', 'email'],
      );

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    if (!id) {
      throw new NotFoundException(`User id is required`);
    }
    const users = await this.knex.table(TABLE_USERS).where('id', id).del();
    return { users };
  }
}
