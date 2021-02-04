import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST /auth/login should return 400 when user not found`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'newuser@kurganskii.dev',
        password: 'password',
      })
      .expect(400);
  });

  it(`/POST /auth/signup should return 401 and create new user`, () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'ilya@kurganskii.dev',
        password: 'password',
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
