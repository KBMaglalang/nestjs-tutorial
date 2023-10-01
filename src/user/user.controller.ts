import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  // @UseGuards(AuthGuard('jwt')) // ! passport already has a guard you can use along with your strategy
  @UseGuards(JwtGuard) // ! setting up a guard class
  @Get('me') // /users/me
  getMe(@Req() req: Request) {
    // ! with the use of the strategy, data sent from the validate is sent to here as well and we can do things with it
    // console.log(
    //   '🚀 ~ file: user.controller.ts:10 ~ UserController ~ getMe ~ Req:',
    //   Req.user,
    // );

    // return 'user info';
    return req.user;
  }
}
