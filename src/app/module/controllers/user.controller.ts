import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import UserService from '../services/user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find all users' })
  @UsePipes(ValidationPipe)
  @ApiTags('Users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find user' })
  @UsePipes(ValidationPipe)
  @ApiTags('Users')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create user' })
  @UsePipes(ValidationPipe)
  @ApiTags('Users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update user' })
  @UsePipes(ValidationPipe)
  @ApiTags('Users')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Delete user' })
  @UsePipes(ValidationPipe)
  @ApiTags('Users')
  delete(@Param('id') id: number) {
    return this.usersService.delete(+id);
  }
}
