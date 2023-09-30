import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ! use this to limit the expected fields in the request body to what you are expecting, what is shown in the dto
    }),
  ); // ! this needs to be added to use the class validator and class transformer

  await app.listen(3333);
}
bootstrap();
