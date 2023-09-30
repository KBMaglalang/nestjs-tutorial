import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
// import { User, Bookmark } from '@prisma/client'; // ! prisma auto generates the types of the models
import * as argon from 'argon2'; // ! use this since it is better than bcrypt

// ! create a matching service fucntion here to be used in the controller
// ! do all the business logic here - connecting to the database, editing fields, etc>>>

@Injectable({}) // ! for dependency injection
export class AuthService {
  // test() {}
  constructor(private prisma: PrismaService) {} // ! throws an error: nest js does not know what that is even if it is in the auth module, the prisma module has no exported it to other providers

  async signUp(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      // select: { //! would usually use something like transformers instead
      //   //  this is one option to limit the return data sent back to the client
      //   id: true,
      //   email: true,
      //   createdAt: true,
      // },
    });

    delete user.hash; // ! this is quick and dirty

    // return the saved user
    return user;
    // ! note the hash should not be returned to the client

    // return { msg: 'I have signed up' };
  }

  signin() {
    return { msg: 'I have signed in' };
  }
}

// the controlller will need to call the functions in the service - business logic
// would need to do something like conser service = new AuthService() - but to not bother deailing with this, you can use dependency injection to not worry about it
