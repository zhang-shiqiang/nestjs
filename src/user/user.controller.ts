import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUser(): string {
    return this.userService.findAll();
  }


  @Post()
  createUser(@Body() userData: Partial<User>): Promise<User> {
    console.log('Creating user:', userData);
    return this.userService.createUser(userData);
  }

  @Put()
  updateUser(@Body('id') id: number, @Body() updateData: Partial<User>): Promise<UpdateResult> {
    console.log('Updating user ID:', id, 'with data:', updateData);
    return this.userService.updateUser(id, updateData);
  }
}
