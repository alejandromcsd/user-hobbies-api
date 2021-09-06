import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import UserService from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

// NOTE: We could apply better reusability to our mock values
const email = 'test@mail.com';
const pwd = '12345678';

describe('UserController Unit Tests', () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => []),
        create: jest.fn((dto) => {
          return [
            {
              id: 1,
              ...dto,
            },
          ];
        }),
        update: jest.fn(() => null),
        delete: jest.fn(() => null),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider],
    }).compile();

    usersController = app.get<UserController>(UserController);
    usersService = app.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should call findAll method', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findOne method', () => {
      const id = 0;
      usersController.findOne(id);
      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  // NOTE: illustrating unit test using user.service mock up
  describe('create', () => {
    it('should call create method', () => {
      const dto = new CreateUserDto();
      dto.email = email;
      dto.password = pwd;

      expect(usersController.create(dto)).toEqual([
        {
          id: expect.any(Number),
          email: email,
          password: pwd,
        },
      ]);

      expect(usersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call update method', () => {
      const dto = new UpdateUserDto();
      const id = 0;
      usersController.update(id, dto);
      expect(usersService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete', () => {
    it('should call delete method', () => {
      const id = 0;
      usersController.delete(id);
      expect(usersService.delete).toHaveBeenCalledWith(id);
    });
  });
});
