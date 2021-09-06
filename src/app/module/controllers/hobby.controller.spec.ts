import { Test, TestingModule } from '@nestjs/testing';
import { HobbyController } from './hobby.controller';
import HobbyService from '../services/hobby.service';
import { CreateHobbyDto, UpdateHobbyDto } from '../dto/hobby.dto';

describe('UserController Unit Tests', () => {
  let hobbiesController: HobbyController;
  let hobbiesService: HobbyService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: HobbyService,
      useFactory: () => ({
        findByUser: jest.fn(() => []),
        create: jest.fn(() => null),
        update: jest.fn(() => null),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HobbyController],
      providers: [HobbyService, ApiServiceProvider],
    }).compile();

    hobbiesController = app.get<HobbyController>(HobbyController);
    hobbiesService = app.get<HobbyService>(HobbyService);
  });

  describe('findByUser', () => {
    it('should call findByUser method', () => {
      const userId = 0;
      hobbiesController.findByUser(userId);
      expect(hobbiesService.findByUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('create', () => {
    it('should call create method', () => {
      const dto = new CreateHobbyDto();
      hobbiesController.create(dto);
      expect(hobbiesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call update method', () => {
      const dto = new UpdateHobbyDto();
      const id = 0;
      hobbiesController.update(id, dto);
      expect(hobbiesService.update).toHaveBeenCalledWith(id, dto);
    });
  });
});
