import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { AllowAllGuard } from '@features/auth/guards/jwt-auth.guard.mock';
import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { CreateNodeInputDto } from '@features/family-tree/dto/create-node.input.dto';
import { CreateTreeInputDto } from '@features/family-tree/dto/create-tree.input.dto';
import { blueUser, redUser } from '@features/users/models/user.model.mock';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../../app.module';

describe('Family Tree', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  const prepareDatabase = async () => {
    const createUserBlue = prismaService.user.create({
      data: {
        ...blueUser,
        trees: {
          create: {
            id: 'blue-user-tree-id',
            name: 'Blue User Tree',
          },
        },
      },
    });

    const createUserRed = prismaService.user.create({
      data: {
        ...redUser,
        trees: {
          create: {
            id: 'red-user-tree-id',
            name: 'Red User Tree',
          },
        },
      },
    });

    await prismaService.$transaction([createUserBlue, createUserRed]);
  };

  const clearDatabase = async () => {
    const deleteUserBlue = prismaService.user.delete({
      where: {
        id: blueUser.id,
      },
    });

    const deleteUserRed = prismaService.user.delete({
      where: {
        id: redUser.id,
      },
    });

    await prismaService.$transaction([deleteUserBlue, deleteUserRed]);
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(new AllowAllGuard(blueUser))
      .compile();

    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get(PrismaService);
    await app.init();
    await prepareDatabase();
  });

  it(`/GET /family-tree/trees should return trees only for blue user`, async () => {
    return request(app.getHttpServer())
      .get('/family-tree/trees')
      .expect(({ body }) => {
        expect(body.trees).toMatchObject([
          {
            id: 'blue-user-tree-id',
            name: 'Blue User Tree',
            creatorId: blueUser.id,
          },
        ]);
      })
      .expect(200);
  });

  it(`/POST /family-tree/trees should create a tree`, async () => {
    const body: CreateTreeInputDto = {
      name: 'New Blue Tree',
    };
    return request(app.getHttpServer())
      .post('/family-tree/trees')
      .send(body)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          name: 'New Blue Tree',
          creatorId: blueUser.id,
        });
      })
      .expect(201);
  });

  describe('/POST /family-tree/trees/:id/node', () => {
    it(`/POST /family-tree/trees/blue-user-tree-id/node should create a node`, async () => {
      const body: CreateNodeInputDto = {
        firstname: 'Node Blue Firstname',
        lastname: 'Node Blue Lastname',
        description: 'Node Blue Description',
      };
      return request(app.getHttpServer())
        .post('/family-tree/trees/blue-user-tree-id/node')
        .send(body)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            firstname: 'Node Blue Firstname',
            lastname: 'Node Blue Lastname',
            description: 'Node Blue Description',
            treeId: 'blue-user-tree-id',
          });
        })
        .expect(201);
    });

    it(`/POST /family-tree/trees/red-user-tree-id/node should return 403 error`, async () => {
      const body: CreateNodeInputDto = {
        firstname: 'Node Blue Firstname',
        lastname: 'Node Blue Lastname',
        description: 'Node Blue Description',
      };
      return request(app.getHttpServer())
        .post('/family-tree/trees/red-user-tree-id/node')
        .send(body)
        .expect(403);
    });
  });

  describe('/GET /family-tree/trees/:id/nodes', () => {
    it(`/GET /family-tree/trees/red-user-tree-id/nodes should return 403`, async () => {
      return request(app.getHttpServer())
        .get('/family-tree/trees/red-user-tree-id/nodes')
        .expect(403);
    });
  });

  afterAll(async () => {
    await clearDatabase();
    await app.close();
  });
});
