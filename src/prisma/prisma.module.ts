import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ! this is one method with a matching inport on another modules, however if there are multiple modules that needs access to it, in this case the database, you can make it as global, make sure the module is imported at the app module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
