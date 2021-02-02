export class PrismaServiceMock {
  user = {
    create: () => Promise.resolve(),
    update: () => Promise.resolve(),
  };
}
