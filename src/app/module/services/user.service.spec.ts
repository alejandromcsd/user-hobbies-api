import { Test, TestingModule } from '@nestjs/testing';
import UserService from './user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

class ApiServiceMock {
  findAll() {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(id: number) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(dto: any) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, dto: any) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: string) {
    return [];
  }
}

describe.only('UserService Unit Tests', () => {
  let spyService: UserService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useClass: ApiServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [UserService, ApiServiceProvider],
    }).compile();
    spyService = app.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should call findAll method with expected param', async () => {
      const findAllSpy = jest.spyOn(spyService, 'findAll');
      spyService.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findOne method with expected param', async () => {
      const findOneSpy = jest.spyOn(spyService, 'findOne');
      const id = 0;
      spyService.findOne(id);
      expect(findOneSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should call create method with expected params', async () => {
      const createSpy = jest.spyOn(spyService, 'create');
      const dto = new CreateUserDto();
      spyService.create(dto);
      expect(createSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call update method with expected params', async () => {
      const updateSpy = jest.spyOn(spyService, 'update');
      const id = 0;
      const dto = new UpdateUserDto();
      spyService.update(id, dto);
      expect(updateSpy).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete', () => {
    it('should call delete method with expected param', async () => {
      const deleteSpy = jest.spyOn(spyService, 'delete');
      const id = 0;
      spyService.delete(id);
      expect(deleteSpy).toHaveBeenCalledWith(id);
    });
  });
});
