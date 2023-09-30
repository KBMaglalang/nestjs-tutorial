import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

// ! controller will handle the requests and responses - will handle the body of the request, check the header, or any work related to the request

@Controller('auth') // ! good practice to have a prefix route and can be done this way
export class AuthController {
  // ! nestjs will handle how to instantiate the service and how to pass it to the controller file
  constructor(private authService: AuthService) {
    // this.authService.test(); // !temp - can easily call the function in the service class this way
  }

  @Post('signup') // * POST auth/signup
  // signUp(@Req() req: Request) {
  // ! DON'T USE THE REQUEST OBJECT OF THE UNDERLYING LIBRARY (EXPRESS FASTIFY) IN CASE YOU WANT TO SWITCH TO THE OTHER
  // return { response: 'I am signup' }; // ! nest js automatically handles content type depending on what is used
  // return 'I am signup';
  // console.log(req.body);
  signUp(
    // @Body('email') email: string,
    // @Body('password') password: string,
    // @Body('password', ParseIntPipe) password: string, // ! with the parseintpipe added and expecting for a number, it will throw an error and send a message back to the client
    @Body() dto: AuthDto,
  ) {
    //! use this instead, since nestjs will get the body for you
    /* The line `console.log('🚀 ~ file: auth.controller.ts:20 ~ signUp ~ dto:', dto);` is used to log
    the value of the `dto` variable to the console. This can be helpful for debugging purposes, as
    it allows you to see the contents of the `dto` object when the `signUp` method is called. */
    // console.log('🚀 ~ file: auth.controller.ts:20 ~ signUp ~ dto:', dto);

    // console.log({
    //   email,
    //   typoeOfEmail: typeof email,
    //   password,
    //   typeOfPassword: typeof password,
    // });

    return this.authService.signUp(dto);
  }

  @Post('signin') // * POST auth/signin
  signIn(@Body() dto: AuthDto) {
    // return 'I am signin';
    return this.authService.signin(dto);
  }
}

/*
private is similar to:

authSerivce: AuthService;

constructor(authService: AuthService) {
  this.authService = authService
}

*/
