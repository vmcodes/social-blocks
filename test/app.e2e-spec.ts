import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    return await app.init();
  }, 3000);

  it('/ (GET)', async () => {
    return await request(app.getHttpServer()).get('/').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
