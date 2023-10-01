import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IsEmail } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // ! leave in the jwt to make it clearer for other people to understnad
  constructor(
    config: ConfigService, // ! can't put private here since, super must be called before everything, so you can't use 'this'
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // ignoreExpiration: false, // false by default
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // console.log(
    //   '🚀 ~ file: jwt.strategy.ts:18 ~ JwtStrategy ~ validate ~ payload:',
    //   payload,
    // );

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.hash;

    // return payload; // ! if returned a 'null' then it will a throw an unothorized/error
    return user;
  }
}
