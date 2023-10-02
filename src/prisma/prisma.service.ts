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

  cleanDb() {
    return this.$transaction([
      // ! there is a possibility that prisma may optimize and still delete the user before the bookmarks, so use transaction to force it to do in order
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
