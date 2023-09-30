import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

// ! module decorator for the class - required to indicator if it is a module or not
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //! uses the dontenv library underneath // need to add the global decorator since it is imported in app but need to be used in the prisma service
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ], // other modulres are added automatically with the nest.js generator
})
export class AppModule {}

// ! this is the main module that will import the other modules
