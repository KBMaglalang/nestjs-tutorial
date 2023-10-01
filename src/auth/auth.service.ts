import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
// import { User, Bookmark } from '@prisma/client'; // ! prisma auto generates the types of the models
import * as argon from 'argon2'; // ! use this since it is better than bcrypt
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ! create a matching service fucntion here to be used in the controller
// ! do all the business logic here - connecting to the database, editing fields, etc>>>

@Injectable({}) // ! for dependency injection
export class AuthService {
  // test() {}
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {} // ! throws an error: nest js does not know what that is even if it is in the auth module, the prisma module has no exported it to other providers

  async signUp(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
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
      // return user;
      return this.signToken(user.id, user.email);
      // ! note the hash should not be returned to the client
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // ! error number from prisma - check their documentation to find out more
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }

    // return { msg: 'I have signed up' };
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if the user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials Incorrect');

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    // delete user.hash;

    // send back the user
    // return user;
    // return { msg: 'I have signed in' };
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}

// the controlller will need to call the functions in the service - business logic
// would need to do something like conser service = new AuthService() - but to not bother deailing with this, you can use dependency injection to not worry about it
