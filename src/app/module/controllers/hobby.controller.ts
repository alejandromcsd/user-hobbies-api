import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateHobbyDto, UpdateHobbyDto } from '../dto/hobby.dto';
import HobbyService from '../services/hobby.service';

@Controller('/api/hobbies')
export class HobbyController {
  constructor(private readonly hobbiesService: HobbyService) {}

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find hobbies by user' })
  @UsePipes(ValidationPipe)
  @ApiTags('Hobbies')
  findByUser(@Param('userId') userId: number) {
    return this.hobbiesService.findByUser(userId);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create hobby' })
  @UsePipes(ValidationPipe)
  @ApiTags('Hobbies')
  create(@Body() createUserDto: CreateHobbyDto) {
    return this.hobbiesService.create(createUserDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update hobby' })
  @UsePipes(ValidationPipe)
  @ApiTags('Hobbies')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateHobbyDto) {
    return this.hobbiesService.update(+id, updateUserDto);
  }
}
