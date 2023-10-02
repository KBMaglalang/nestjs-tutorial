import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // ! use this to limit the expected fields in the request body to what you are expecting, what is shown in the dto
      }),
    ); // ! this needs to be added to use the class validator and class transformer\

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it.todo('should pass'); // * just to confirm if everything is working
});
