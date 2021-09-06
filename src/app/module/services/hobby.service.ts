import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateHobbyDto, UpdateHobbyDto } from '../dto/hobby.dto';
import { TABLE_HOBBIES, TABLE_USERS } from '../../app.constants';
import { plainToClass } from 'class-transformer';

@Injectable()
export default class HobbyService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findByUser(userId: number) {
    if (!userId) {
      throw new NotFoundException(`User id required`);
    }

    const hobbies = await this.knex
      .table(TABLE_USERS)
      .join(TABLE_HOBBIES, 'users.id', 'hobbies.userId')
      .select(
        'hobbies.id',
        'hobbies.userId',
        'hobbies.name',
        'hobbies.description',
      )
      .where('userId', userId);
    return { hobbies };
  }

  async create(createHobbyDto: CreateHobbyDto) {
    try {
      const hobbies = await this.knex.table(TABLE_HOBBIES).insert(
        {
          userId: createHobbyDto.userId,
          name: createHobbyDto.name,
          description: createHobbyDto.description,
        },
        ['id', 'userId', 'name', 'description'],
      );

      return { hobbies };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateHobbyDto: UpdateHobbyDto) {
    try {
      // NOTE:
      // Skipping authN (as requested) and illustrating instead some basic authZ
      // For authN/authZ in real-scenario, we might want to look into an strategy
      // that works well with NestJS: for instance bearer tokens (JWT),
      // and a NestJS auth service/module like Passport.
      // For restricting access to records/resources, something like CASL:
      // https://docs.nestjs.com/security/authorization#integrating-casl

      // current user should be retrieved from the request context (e.g. JWT)
      const loggedUserId = 3;

      // can be improved with an access control factory as per link above
      const h = await this.knex.table(TABLE_HOBBIES).where('id', id).first();
      const hobby = plainToClass(CreateHobbyDto, h);

      if (hobby.userId !== loggedUserId) {
        throw new HttpException(
          'Unauthorized to update this record',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const hobbies = await this.knex
        .table(TABLE_HOBBIES)
        .where('id', id)
        .update(
          {
            name: updateHobbyDto.name,
            description: updateHobbyDto.description,
          },
          ['id', 'userId', 'name', 'description'],
        );

      return { hobbies };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
