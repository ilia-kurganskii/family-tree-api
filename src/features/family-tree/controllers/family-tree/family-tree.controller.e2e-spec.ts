import { JwtAuthGuard } from '@features/auth/guards/jwt-auth.guard';
import { AllowAllGuard } from '@features/auth/guards/jwt-auth.guard.mock';
import { PrismaService } from '@features/common/services/prisma/prisma.service';
import { AddChildInputDto } from '@features/family-tree/dto/add-child.input.dto';
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
          create: [
            {
              id: 'blue-user-tree-id',
              name: 'Blue User Tree',
              nodes: {
                create: [
                  {
                    id: 'blue-user-node-1',
                    firstname: 'First',
                    lastname: 'Node',
                  },
                  {
                    id: 'blue-user-node-2',
                    firstname: 'Second',
                    lastname: 'Node',
                  },
                ],
              },
            },
            {
              id: 'second-blue-user-tree-id',
              name: 'Second Blue User Tree',
              nodes: {
                create: [
                  {
                    id: 'second-blue-user-node-1',
                    firstname: 'First',
                    lastname: 'Node',
                  },
                  {
                    id: 'second-blue-user-node-2',
                    firstname: 'Second',
                    lastname: 'Node',
                  },
                ],
              },
            },
          ],
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
            nodes: {
              create: [
                {
                  id: 'red-user-node-1',
                  firstname: 'First',
                  lastname: 'Node',
                },
                {
                  id: 'red-user-node-2',
                  firstname: 'Second',
                  lastname: 'Node',
                },
              ],
            },
          },
        },
      },
    });

    await prismaService.$transaction([createUserBlue, createUserRed]);
  };

  const clearDatabase = async () => {
    const deleteNodes = prismaService.node.deleteMany();
    const deleteTrees = prismaService.tree.deleteMany();
    const deleteUsers = prismaService.user.deleteMany();

    await prismaService.$transaction([deleteNodes, deleteTrees, deleteUsers]);
  };

  afterAll(async () => {
    await clearDatabase();
    await app.close();
  });

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
          {
            id: 'second-blue-user-tree-id',
            name: 'Second Blue User Tree',
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

  describe('/GET /family-tree/trees/:id/nodes', () => {
    it(`/GET /family-tree/trees/red-user-tree-id/nodes should return 200`, async () => {
      return request(app.getHttpServer())
        .get('/family-tree/trees/blue-user-tree-id/nodes')
        .expect(({ body }) => {
          expect(body).toMatchObject({
            nodes: [
              {
                id: 'blue-user-node-1',
                firstname: 'First',
                lastname: 'Node',
              },
              {
                id: 'blue-user-node-2',
                firstname: 'Second',
                lastname: 'Node',
              },
            ],
          });
        })
        .expect(200);
    });

    it(`/GET /family-tree/trees/red-user-tree-id/nodes should return 403`, async () => {
      return request(app.getHttpServer())
        .get('/family-tree/trees/red-user-tree-id/nodes')
        .expect(403);
    });
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

  describe('/POST /family-tree/nodes/:id/children', () => {
    it(`/POST /family-tree/nodes/blue-user-node-1/children should return 200`, async () => {
      const requestBody: AddChildInputDto = {
        childId: 'blue-user-node-2',
      };
      return request(app.getHttpServer())
        .post('/family-tree/nodes/blue-user-node-1/children')
        .send(requestBody)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            firstname: 'First',
            lastname: 'Node',
            childrenIds: ['blue-user-node-2'],
          });
        })
        .expect(200);
    });

    it(`/POST /family-tree/nodes/red-user-node-1/children should return 403 for node of other user`, async () => {
      const requestBody: AddChildInputDto = {
        childId: 'blue-user-node-2',
      };
      return request(app.getHttpServer())
        .post('/family-tree/nodes/red-user-node-1/children')
        .send(requestBody)
        .expect(403);
    });

    it(`/POST /family-tree/nodes/blue-user-node-1/children should return 400 for nodes from different tree`, async () => {
      const requestBody: AddChildInputDto = {
        childId: 'second-blue-user-node-1',
      };
      return request(app.getHttpServer())
        .post('/family-tree/nodes/blue-user-node-1/children')
        .send(requestBody)
        .expect(400);
    });
  });
});
