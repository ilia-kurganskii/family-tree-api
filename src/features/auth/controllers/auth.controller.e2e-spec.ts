import { blueUser } from '@features/users/models/user.model.mock';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { UserService } from '@features/users/services/user/user.service';

describe('Auth', () => {
  let app: INestApplication;
  let userService: UserService;

  const prepareDatabase = async () => {
    await userService.createUser(blueUser);
  };

  const clearDatabase = async () => {
    // TODO: clear database
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    userService = moduleRef.get(UserService);
    await app.init();
    await prepareDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
    await app.close();
  });

  describe('POST /auth/login', () => {
    it(`POST /auth/login should return 400 when user was not found`, () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'not-exists@example.com',
          password: 'password',
        })
        .expect(400);
    });

    it(`POST /auth/login should return 400 when user password is incorrect`, () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'blue.user@example.com',
          password: 'red-password',
        })
        .expect(400);
    });

    it(`POST /auth/login should return 200 when email and password is correct`, () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'blue.user@example.com',
          password: 'blue-password',
        })
        .expect(({ body }) => {
          expect(body).toMatchObject({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
          });
        })
        .expect(200);
    });
  });

  describe('POST /auth/signup', () => {
    it(`/POST /auth/signup should return 201 and create new user`, () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'new.user@example.com',
          password: 'new-password',
        })
        .expect(201);
    });

    it(`/POST /auth/signup should return 400 when user has been already created`, () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'blue.user@example.com',
          password: 'new-password',
        })
        .expect(400);
    });

    it(`/POST /auth/signup should return 400 when user has been already created`, () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'blue.user@example.com',
          password: 'new-password',
        })
        .expect(400);
    });
  });

  describe('POST /auth/refresh', () => {
    it('POST /auth/refresh should return 200 and new tokens', async () => {
      // prepare
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'blue.user@example.com',
          password: 'blue-password',
        })
        .expect(200);

      const refreshToken = response.body.refreshToken;

      //act
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          token: refreshToken,
        })
        .expect(({ body }) => {
          expect(body).toMatchObject({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
          });
        })
        .expect(200);
    });
  });

  describe('GET /auth/me', () => {
    it('POST /auth/me should return 200', async () => {
      // prepare
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'blue.user@example.com',
          password: 'blue-password',
        })
        .expect(200);

      const accessToken = response.body.accessToken;
      //act
      return request(app.getHttpServer())
        .get('/auth/me')
        .auth(accessToken, { type: 'bearer' })
        .expect(200);
    });
  });

  describe('POST /auth/logout', () => {
    it('POST /auth/logout should return 200', async () => {
      await request(app.getHttpServer()).post('/auth/logout').expect(200);
    });
  });
});
