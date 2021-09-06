import { Test, TestingModule } from '@nestjs/testing';
import HobbyService from './hobby.service';
import { CreateHobbyDto, UpdateHobbyDto } from '../dto/hobby.dto';

class ApiServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByUser(userId: number) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(dto: any) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, dto: any) {
    return [];
  }
}

describe.only('HobbyService Unit Tests', () => {
  let spyService: HobbyService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: HobbyService,
      useClass: ApiServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [HobbyService, ApiServiceProvider],
    }).compile();
    spyService = app.get<HobbyService>(HobbyService);
  });

  describe('findByUser', () => {
    it('should call findOne method with expected param', async () => {
      const findByUserSpy = jest.spyOn(spyService, 'findByUser');
      const userId = 0;
      spyService.findByUser(userId);
      expect(findByUserSpy).toHaveBeenCalledWith(userId);
    });
  });

  describe('create', () => {
    it('should call create method with expected params', async () => {
      const createSpy = jest.spyOn(spyService, 'create');
      const dto = new CreateHobbyDto();
      spyService.create(dto);
      expect(createSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call update method with expected params', async () => {
      const updateSpy = jest.spyOn(spyService, 'update');
      const id = 0;
      const dto = new UpdateHobbyDto();
      spyService.update(id, dto);
      expect(updateSpy).toHaveBeenCalledWith(id, dto);
    });
  });
});
