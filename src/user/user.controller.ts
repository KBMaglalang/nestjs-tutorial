import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard) // ! require an identity in the user controller on a global level for the users route
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard('jwt')) // ! passport already has a guard you can use along with your strategy
  // @UseGuards(JwtGuard) // ! setting up a guard class
  @Get('me') // /users/me
  // getMe(@Req() req: Request) {
  getMe(@GetUser() user: User) {
    // ! with the use of the strategy, data sent from the validate is sent to here as well and we can do things with it
    // console.log(
    //   '🚀 ~ file: user.controller.ts:10 ~ UserController ~ getMe ~ Req:',
    //   Req.user,
    // );

    // return 'user info';
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    // ! the effect of returning the specified key was set in the decorator file
    return this.userService.editUser(userId, dto);
  }
}
