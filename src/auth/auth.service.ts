import { Injectable } from '@nestjs/common';

// ! create a matching service fucntion here to be used in the controller
// ! do all the business logic here - connecting to the database, editing fields, etc>>>

@Injectable({}) // ! for dependency injection
export class AuthService {
  // test() {}

  signUp() {
    return { msg: 'I have signed up' };
  }

  signin() {
    return { msg: 'I have signed in' };
  }
}

// the controlller will need to call the functions in the service - business logic
// would need to do something like conser service = new AuthService() - but to not bother deailing with this, you can use dependency injection to not worry about it
