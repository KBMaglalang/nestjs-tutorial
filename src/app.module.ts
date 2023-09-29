import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

// ! module decorator for the class - required to indicator if it is a module or not
@Module({
  imports: [AuthModule, UserModule, BookmarkModule], // other modulres are added automatically with the nest.js generator
})
export class AppModule {}

// ! this is the main module that will import the other modules
