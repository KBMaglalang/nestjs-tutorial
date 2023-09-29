import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// ! controller will handle the requests and responses - will handle the body of the request, check the header, or any work related to the request

@Controller('auth') // ! good practice to have a prefix route and can be done this way
export class AuthController {
  // ! nestjs will handle how to instantiate the service and how to pass it to the controller file
  constructor(private authService: AuthService) {
    // this.authService.test(); // !temp - can easily call the function in the service class this way
  }

  @Post('signup') // * POST auth/signup
  signUp() {
    // return { response: 'I am signup' }; // ! nest js automatically handles content type depending on what is used
    // return 'I am signup';
    return this.authService.signUp();
  }

  @Post('signin') // * POST auth/signin
  signIn() {
    // return 'I am signin';
    return this.authService.signin();
  }
}

/*
private is similar to:

authSerivce: AuthService;

constructor(authService: AuthService) {
  this.authService = authService
}

*/
