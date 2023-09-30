import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',  // ! not good to do to have the path name visible in code
          url: config.get('DATABASE_URL'),
        },
      },
    });
    // console.log({ config: config.get('DATABASE_URL') });
  }
}
